import _ from "lodash";
import { lastValueFrom, map, Observable } from "rxjs";
import { Repository } from "typeorm";
import { CollectionType, SipherCollection } from "@entity";
import { HttpService } from "@nestjs/axios";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";
import { TokenType } from "@modules/nft/nft.dto";
import { NftItemService } from "@modules/nft/nftItem.service";
import { URIService } from "@modules/uri/uri.service";
import {
  isLootboxContract,
  isSculptureContract,
  toCamcelCase,
  toTokenId,
} from "@utils/utils";

import marketplaceClient from "../../api/marketplaceClient";

import {
  CollectionStats,
  Portfolio,
  PortfolioByCollectionAndUserIdQuery,
  PortfolioByCollectionQuery,
  PortfolioQuery,
  UserSocialInfo,
} from "./collection.dto";

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

  private openseaApiTestBaseUrl = "https://testnets-api.opensea.io/api/v1/";

  /* Calling Opensea api to update collection stats */
  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    await this.updateEveryCollectionStats();
  }

  /**
   *
   * @returns all collection based on current evironment
   */
  async getAllCollection() {
    const collections = await this.sipherCollectionRepo.find();
    if (constant.isProduction) {
      return collections.filter((col) => [1, 137].indexOf(col.chainId) !== -1);
    }
    return collections;
  }

  /**
   *
   * @param {string} collectionSlug unique identifier string, either from opensea or from collection table
   * @param {boolean} mainnet true to call mainnet opensea, and vice versa
   * @returns {Observable<any>} observable stream of api response
   */
  getCollectionStats(collectionSlug: string, mainnet = true): Observable<any> {
    const data = this.httpService.get(
      `${
        mainnet ? this.openseaApiBaseUrl : this.openseaApiTestBaseUrl
      }/collection/${collectionSlug}/stats`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data.pipe(map((res) => toCamcelCase(res.data.stats)));
  }

  /**
   *
   * @param {string} userAddress portfolio owner's address
   * @param {PortfolioQuery} query query options to filter collection
   * @returns {Portfolio[]} user's portfolio
   */
  async getPortfolio(userAddress: string, query: PortfolioQuery) {
    /* Get user items */
    const inventory = await this.nftService.search(
      {
        owner: userAddress,
      },
      0,
      1000
    );

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

    return filteredPortfolio.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  }

  /**
   *
   * @param {PortfolioByCollectionQuery} query query options
   * @returns portfolio of a collection
   */
  async getPortfolioByCollection(query: PortfolioByCollectionQuery) {
    const collection = await this.sipherCollectionRepo.findOne({
      where: {
        id: query.collectionId,
      },
    });
    if (!collection) {
      return {
        collection: {},
        items: [],
        total: 0,
      };
    }
    const inventory = await this.nftService.search(
      {
        owner: query.userAddress,
        collections: [collection.id],
      },
      0, // query.from,
      10000 // query.size
    );
    inventory.forEach((item) => delete item._relation);
    const items = inventory
      .filter((el) => el.value > 0)
      .slice(query.from, query.from + query.size);
    const total = inventory.reduce((prev, curr) => prev + curr.value, 0);

    return {
      collection,
      total,
      items: await this.addUriToItem(items),
    };
  }

  async getPortfolioByCollectionAndUserId(
    query: PortfolioByCollectionAndUserIdQuery
  ) {
    const collection = await this.sipherCollectionRepo.findOne({
      where: {
        id: query.collectionId,
      },
    });
    if (!collection) {
      return {
        collection: {},
        items: [],
        total: 0,
      };
    }
    const result = {
      collection: {},
      items: [],
      total: 0,
    };
    await query.userAddress.reduce(async (promise, publicAddress) => {
      await promise;
      const inventory = await this.nftService.search(
        {
          owner: publicAddress,
          collections: [collection.id],
        },
        query.from,
        query.size
      );
      result.items.push(...inventory);
      result.total += await this.nftService.count({
        owner: publicAddress,
        collections: [collection.id],
      });
    }, Promise.resolve());
    result.items.forEach((item) => delete item._relation);
    return {
      collection,
      total: result.total,
      items: await this.addUriToItem(result.items),
    };
  }
  /**
   *
   * @param {string} itemId erc721 or erc1155 id
   * @param {string} socialToken token from ather, needed to get info of related addressses
   * @returns detail of an erc721 or erc1155
   */

  async getItemById(itemId: string, socialToken?: string): Promise<any> {
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
      try {
        const response =
          await marketplaceClient.api.nftItemControllerGetDetailsById(itemId);
        item = {
          ...response.data.item,
          attributes: response.data.attributes,
        } as any;
      } catch (err) {
        LoggerService.error(
          err,
          `Failed to get ERC721 ${itemId} from marketplace API`
        );
      }
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
      if (item.collection.collectionType === CollectionType.ERC1155) {
        const totalMintedItems = await this.getTotalErc1155Minted(
          item.collectionId,
          item.tokenId
        );
        const quantity = this.getErc1155Quantity(totalMintedItems);
        item.quantity = quantity;
        const allOwner = await this.getAllOwnerOfErc1155(
          totalMintedItems,
          socialToken
        );
        item.allOwner = allOwner;
      } else {
        const ownerInfo = await this.getInfoFromAddress(
          item.owner,
          socialToken
        );
        item.ownerInfo = ownerInfo;
      }
    }
    item.creatorInfo = await this.getInfoFromAddress(item.creator, socialToken);
    const itemWithUri = (await this.addUriToItem([item]))[0];

    return itemWithUri;
  }

  /**
   *
   * @param {string} collectionId collection id
   * @param {CollectionStats} stats stats of a collection
   */
  private async updateCollectionStats(
    collectionId: string,
    stats: CollectionStats
  ) {
    const collection = await this.sipherCollectionRepo.findOne({
      id: collectionId,
    });
    if (collection) {
      collection.floorPrice = stats.floorPrice;
      collection.totalSales = stats.totalSales;
      collection.totalSupply = stats.totalSupply;
      collection.totalVolume = stats.totalVolume;
      collection.marketCap = stats.marketCap;
      await this.sipherCollectionRepo.save(collection);
    }
  }

  private async updateEveryCollectionStats() {
    const collections = await this.sipherCollectionRepo.find();
    for (let i = 0; i < collections.length; i++) {
      try {
        const stats = await lastValueFrom(
          this.getCollectionStats(
            collections[i].collectionSlug,
            collections[i].chainId === 1
          )
        );
        await this.updateCollectionStats(collections[i].id, stats);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          LoggerService.debug("Collection stats not found");
        } else {
          LoggerService.error(err);
        }
      }
    }
  }

  /**
   *
   * @param {string} id id of an item, in format {contractAddress}:{tokenId} for erc721 and {contractAddress}:{tokenId}:{ownerAddress}
   * @returns {boolean} whether It is an erc1155 id
   */
  private isErc1155Id(id: string) {
    // Ghetto id check ????
    return id.split(":").length === 3;
  }

  /**
   *
   * @param {string} collectionId collection id
   * @param {string} tokenId token id
   * @returns
   */
  private async getTotalErc1155Minted(collectionId: string, tokenId: string) {
    const totalMintedforCollection = await this.nftService.search(
      {
        collections: [collectionId],
        tokenId,
      },
      0,
      1000
    );
    return totalMintedforCollection;
  }

  /**
   *
   * @param {string} address ethereum address
   * @param socialToken JWT token from ather
   * @returns social info of the address, if not existed, will still return object with empty property
   */
  private async getInfoFromAddress(address: string, socialToken: string) {
    const socialInfoArr = await this.getAvatarByAddresses(
      [address],
      socialToken
    );
    const socialInfo = socialInfoArr[0];
    return {
      publicAddress: address ? address.toLowerCase() : "",
      profileImage: socialInfo ? socialInfo.avatarImage : "",
      username: socialInfo ? socialInfo.name : "",
    };
  }

  /**
   *
   * @param items array of erc1155 items
   * @param {string} socialToken JWT token from ather
   * @returns array of social info
   */
  private async getAllOwnerOfErc1155(items: any, socialToken?: string) {
    const socialInfo = socialToken
      ? await this.getAvatarByAddresses(
          items.map((item) => item.owner),
          socialToken
        )
      : [];
    const ownerArray = items.map((item) => {
      const userSocialInfo = socialInfo.find(
        (info) => info.address === item.owner
      );
      return {
        publicAddress: item.owner.toLowerCase(),
        totalOwned: item.value,
        profileImage: userSocialInfo ? userSocialInfo.avatarImage : "",
        username: userSocialInfo ? userSocialInfo.name : "",
      };
    });
    return ownerArray;
  }

  /**
   * Call ather-social api to get users names and avatars
   * @param {string} addresses array of ethereum address
   * @param socialToken JWT token from ather
   * @returns empty array or array of social info from ather-social api
   */
  private async getAvatarByAddresses(
    addresses: string[],
    socialToken: string
  ): Promise<UserSocialInfo[]> {
    const addressQuery = addresses.join(",");
    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `${constant.ATHER_SOCIAL_URL}/api/user/by-address`,
          {
            headers: {
              Authorization: socialToken,
            },
            params: {
              address: addressQuery,
            },
          }
        )
      );
      return response.data;
    } catch (err) {
      LoggerService.error(
        err,
        `Failed to get ${addressQuery} info from social`
      );
      return [];
    }
  }

  /**
   *
   * @param items erc1155 items
   * @returns total quantity of items
   */
  private getErc1155Quantity(items: any) {
    const quantity = items.reduce((prev, curr) => prev + curr.value, 0);
    return quantity;
  }

  /**
   * Add uri to erc115 items
   * @param items erc1155 items
   * @returns erc1155 items with uri
   */
  private async addUriToItem(items: any) {
    const newItems = [];
    for (const item of items) {
      const newItem = await this.addUriToSculptureOrLootbox(item);
      newItems.push(newItem);
    }
    return newItems;
  }

  // Best practice? Never heard of him ????
  /**
   * Add uri to item if It is either lootbox or sculpture
   * @param item erc1155 item
   * @returns erc1155 item with uri
   */
  private async addUriToSculptureOrLootbox(item: any) {
    const newItem = { ...item };
    let uriInfo;
    if (isLootboxContract(item.collectionId)) {
      LoggerService.debug("Is lootbox contract");
      newItem.tokenId = toTokenId(item.tokenId);
      uriInfo = await this.uriService.getDataERC1155Lootbox(
        parseInt(newItem.tokenId, 10)
      );
    }
    if (isSculptureContract(item.collectionId)) {
      LoggerService.debug("Is sculpture contract");
      newItem.tokenId = toTokenId(item.tokenId);
      uriInfo = await this.uriService.getDataERC1155Sculpture(
        parseInt(newItem.tokenId, 10)
      );
    }
    if (uriInfo) {
      newItem.name = uriInfo.name;
      newItem.imageUrl = uriInfo.image;
      newItem.type = TokenType.ERC1155;
    }
    return newItem;
  }

  /**
   * For administration usage
   * @param skip
   * @param take
   * @returns
   */
  async getDataCollectionTableForAdmin(skip: number, take: number) {
    const data = await this.sipherCollectionRepo.find({
      skip,
      take,
    });
    return { total: data.length, data };
  }

  /**
   * For administration usage
   * @param collection
   * @returns
   */
  async updateDataCollectionTableForAdmin(collection: SipherCollection) {
    return this.sipherCollectionRepo.save(collection);
  }
}
