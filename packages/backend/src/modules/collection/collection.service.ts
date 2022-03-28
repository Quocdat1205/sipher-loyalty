import _ from "lodash";
import { map, Observable } from "rxjs";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";
import { NftItemService } from "@modules/nft/nftItem.service";
import { URIService } from "@modules/uri/uri.service";
import { isSculptureContract, isSpaceshipContract } from "@utils/utils";
import marketplaceClient from "src/api/marketplaceClient";
import {
  CollectionType,
  SipherCollection,
} from "src/entity/sipher-collection.entity";

import { Portfolio, PortfolioQuery } from "./collection.dto";

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
    if (constant.isProduction) {
      return collections.filter((col) => col.chainId === 1);
    }
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
    /* Get user items */
    const inventory = await this.nftService.search({
      owner: userAddress,
    });

    /* Aggregate collections */
    const groupedInventoryByCollectionId = _.groupBy(inventory, "collectionId");
    const collections = await this.getAllCollection();
    const portfolio: Portfolio[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const collection of collections) {
      // eslint-disable-next-line no-await-in-loop
      let total = 0;
      if (groupedInventoryByCollectionId[collection.id]) {
        if (collection.collectionType === CollectionType.ERC721) {
          total = groupedInventoryByCollectionId[collection.id].length;
        } else {
          total = groupedInventoryByCollectionId[collection.id].reduce(
            (prev, curr) => prev + curr.value,
            0
          );
        }
      }
      portfolio.push({
        ...collection,
        total,
      });
    }

    /* Filter */
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

  async getPortfolioByCollection(userAddress: string, collectionId: string) {
    const collection = await this.sipherCollectionRepo.findOne({
      where: {
        id: collectionId,
      },
    });
    if (!collection) {
      return {
        collection: {},
        items: [],
        total: 0,
      };
    }
    const inventory = await this.nftService.search({
      owner: userAddress,
      collections: [collection.id],
    });
    inventory.forEach((item) => delete item._relation);
    return {
      collection,
      total: inventory.length,
      items: await this.addUriToItem(inventory),
    };
  }

  async getItemById(itemId: string): Promise<any> {
    /* Getting the base item */
    // So the marketpalce detail sdk doesn't work with ERC1155, have to do it in this way
    let item: any;
    if (this.isErc1155Id(itemId)) {
      LoggerService.debug(`Getting ERC1155 from item ${itemId}`);
      const result = await this.searchSrv.get({
        index: constant.ELASTICSEARCH_INDEX,
        id: itemId,
      });
      item = result?.body?._source ? result?.body?._source : undefined;
    } else {
      LoggerService.debug(`Getting ERC721 from item ${itemId}`);
      const response =
        await marketplaceClient.api.nftItemControllerGetDetailsById(itemId);
      item = {
        ...response.data.item,
        attributes: response.data.attributes,
      } as any;
    }

    if (!item) {
      throw new HttpException("Item not found", HttpStatus.NOT_FOUND);
    }
    /* Add collection to base item, and other info base on collection type */
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

  private isErc1155Id(id: string) {
    // Ghetto id check 💀
    return id.split(":").length === 3;
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
      profileImage: "",
      username: "",
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
      LoggerService.debug("Is spaceship contract");
      const uriInfo = await this.uriService.getDataERC1155Lootbox(item.tokenId);
      if (uriInfo) {
        newItem.name = uriInfo.name;
        newItem.imageUrl = uriInfo.image;
      }
    }
    if (isSculptureContract(item.collectionId)) {
      LoggerService.debug("Is sculpture contract");
      const uriInfo = await this.uriService.getDataERC1155Sculpture(
        item.tokenId
      );
      if (uriInfo) {
        newItem.name = uriInfo.name;
        newItem.imageUrl = uriInfo.image;
      }
    }
    if (newItem.uri) {
      delete newItem.uri.id;
      delete newItem.uri.tokenId;
    }
    return newItem;
  }
}
