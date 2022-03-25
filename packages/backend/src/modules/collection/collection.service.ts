import _ from "lodash";
import { lastValueFrom, map, Observable } from "rxjs";
import { FindOneOptions, Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";
import { NftItemService } from "@modules/nft/nftItem.service";
import { URIService } from "@modules/uri/uri.service";
import { isSculptureContract, isSpaceshipContract } from "@utils/utils";
import {
  CollectionType,
  SipherCollection,
} from "src/entity/sipher-collection.entity";

import { PortfolioQuery } from "./collection.dto";

@Injectable()
export class CollectionService {
  constructor(
    private httpService: HttpService,
    private nftService: NftItemService,
    private uriService: URIService,
    private readonly searchSrv: ElasticsearchService,
    @InjectRepository(SipherCollection)
    private sipherCollectionRepo: Repository<SipherCollection>
  ) {}

  private openseaApiBaseUrl = "https://api.opensea.io/api/v1";

  async getAllCollection() {
    const collections = await this.sipherCollectionRepo.find();
    return collections;
  }

  getCollectionStats(collectionSlug: string): Observable<any> {
    const data = this.httpService.get(
      `${this.openseaApiBaseUrl}/collection/${collectionSlug}/stats`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data.pipe(
      map((res) => {
        const camelCaseStats = {};
        Object.entries(res.data.stats).map((entry) => {
          camelCaseStats[_.camelCase(entry[0])] = entry[1];
        });
        return camelCaseStats;
      })
    );
  }

  async getPortfolio(userAddress: string, query: PortfolioQuery) {
    const inventory = await this.nftService.search({
      owner: userAddress,
    });
    const groupedInventoryByCollectionId = _.groupBy(inventory, "collectionId");
    const portfolio: (SipherCollection & { total: number })[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const collectionId of Object.keys(groupedInventoryByCollectionId)) {
      // eslint-disable-next-line no-await-in-loop
      const collection = await this.sipherCollectionRepo.findOne({
        where: {
          id: collectionId,
        },
      });

      if (!collection) continue;
      let total = 0;
      if (collection.collectionType === CollectionType.ERC721) {
        total = groupedInventoryByCollectionId[collectionId].length;
      } else {
        total = groupedInventoryByCollectionId[collectionId].reduce(
          (prev, curr) => prev + curr.value,
          0
        );
      }
      portfolio.push({
        ...collection,
        total,
      });
    }
    let filteredPortfolio = [...portfolio];
    if (query.category) {
      filteredPortfolio = filteredPortfolio.filter(
        (col) => col.category === query.category
      );
    }
    if (query.chainId) {
      filteredPortfolio = filteredPortfolio.filter(
        (col) => col.chainId.toString() === query.chainId
      );
    }

    return filteredPortfolio;
  }

  async getPortfolioByCollection(userAddress: string, collectionSlug: string) {
    const collection = await this.sipherCollectionRepo.findOne({
      where: {
        collectionSlug,
      },
    });
    if (!collection) {
      return [];
    }
    const inventory = await this.nftService.search({
      owner: userAddress,
      collections: [collection.id],
    });
    return {
      total: inventory.length,
      items: await this.addUriToItem(inventory),
    };
  }

  async getItemById(itemId: string) {
    const result = await this.searchSrv.get({
      index: constant.ELASTICSEARCH_INDEX,
      id: itemId,
    });
    const item = result?.body?._source ? result?.body?._source : undefined;
    if (!item) {
      return item;
    }
    delete item._entity;
    delete item._relation;
    const itemCollection = await this.sipherCollectionRepo.findOne({
      where: {
        id: item.collectionId,
      },
    });
    if (itemCollection) {
      item.collection = itemCollection;
      if (item.collection.collectionType === "ERC1155") {
        const totalMintedItems = await this.getTotalErc1155Minted(
          item.collectionId,
          item.tokenId
        );
        const quantity = this.getErc1155Quantity(totalMintedItems);
        item.quantity = quantity;
        const allOwner = this.getAllOwnerOfErc1155(totalMintedItems);
        item.allOwner = allOwner;
      }
    }

    const itemWithUri = (await this.addUriToItem([item]))[0];

    return itemWithUri;
  }

  private async getTotalErc1155Minted(collectionId: string, tokenId: string) {
    const totalMintedforCollection = await this.nftService.search(
      {
        collections: [collectionId],
        tokenId,
      },
      100
    );
    return totalMintedforCollection;
  }

  private getAllOwnerOfErc1155(items: any) {
    const ownerArray = items.map((item) => ({
      publicAddress: item.owner,
      totalOwned: item.value,
    }));
    return ownerArray;
  }

  private getErc1155Quantity(items: any) {
    const quantity = items.reduce((prev, curr) => prev + curr.value, 0);
    return quantity;
  }

  private async addUriToItem(items: any) {
    const newItems = [];
    for (const item of items) {
      const newItem = await this.addUriToSculptureOrSpaceship(item);
      newItems.push(newItem);
    }
    return newItems;
  }

  // Best practice? Never heard of him 💀
  private async addUriToSculptureOrSpaceship(item: any) {
    const newItem = { ...item };
    if (isSpaceshipContract(item.collectionId)) {
      const uriInfo = await this.uriService.getDataERC1155Spaceship(
        item.tokenId
      );
      newItem.name = uriInfo.name;
      newItem.imageUrl = uriInfo.image;
    }
    if (isSculptureContract(item.collectionId)) {
      const uriInfo = await this.uriService.getDataERC1155Sculpture(
        item.tokenId
      );
      newItem.name = uriInfo.name;
      newItem.imageUrl = uriInfo.image;
    }
    if (newItem.uri) {
      delete newItem.uri.id;
      delete newItem.uri.tokenId;
    }
    return newItem;
  }

  private async getCollectionDetail(slugOrId: string | number) {
    let findOption: FindOneOptions;
    if (typeof slugOrId === "string") {
      findOption = {
        where: {
          collectionSlug: slugOrId,
        },
      };
    } else {
      findOption = {
        where: {
          id: slugOrId,
        },
      };
    }
    const collection = await this.sipherCollectionRepo.findOne(findOption);
    return collection;
  }

  async getCollectionPortfolio(collectionSlug: string, ownerAddress: string) {
    const userInventory = await this.nftService.search({
      owner: ownerAddress,
    });
    const collection = await this.getCollectionDetail(collectionSlug);
    const userCollectionItems = userInventory.filter(
      (item) => item.collectionId === collection.id
    );
    let balance = 0;
    if (collection.collectionType === CollectionType.ERC721) {
      LoggerService.debug(`Getting user ERC721 balance`);
      balance = userCollectionItems.length;
    } else {
      LoggerService.debug(`Getting user ERC1155 balance`);
      balance = userCollectionItems.reduce(
        (prev, curr) => prev + curr.value,
        0
      );
    }
    let totalValue = 0;
    if (!collection.floorPrice) {
      try {
        const stats = await lastValueFrom(
          this.getCollectionStats(collectionSlug)
        );
        totalValue = stats.floorPrice * balance;
      } catch (err) {
        LoggerService.error("Failed to get floor price from Opensea");
      }
    } else {
      totalValue = collection.floorPrice * balance;
    }
    return {
      totalValue: totalValue.toFixed(4),
    };
  }
}
