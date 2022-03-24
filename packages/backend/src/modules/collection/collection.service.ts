import _ from "lodash";
import { lastValueFrom, map, Observable } from "rxjs";
import { FindOneOptions, Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "@modules/logger/logger.service";
import { NftItemService } from "@modules/nft/nftItem.service";
import { URIService } from "@modules/uri/uri.service";
import { isSculptureContract, isSpaceshipContract } from "@utils/utils";
import {
  CollectionType,
  SipherCollection,
} from "src/entity/sipher-collection.entity";

import { PortfolioQuery } from "./collection.dto";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import constant from "@setting/constant";

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
          contractAddress: collectionId,
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
      collections: [collection.contractAddress],
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
        contractAddress: item.collectionId,
      },
    });
    if (itemCollection) {
      item.collection = itemCollection;
    }
    const itemWithUri = (await this.addUriToItem([item]))[0];

    return itemWithUri;
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
