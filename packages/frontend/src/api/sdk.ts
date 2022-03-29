/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum MintStatus {
  Minting = 'Minting',
  Minted = 'Minted',
  Canceled = 'Canceled',
  Expired = 'Expired',
  Error = 'Error',
  Rejected = 'Rejected',
}

export enum MintType {
  Lootbox = 'Lootbox',
  SpaceshipPart = 'SpaceshipPart',
  Spaceship = 'Spaceship',
}

export interface InfoPendingMintDto {
  name: string;
  image: string;
  tokenId: number;
  quantity: number;
}

export interface ResPendingMintDto {
  id: number;
  to: string;
  batchID: number;
  amount: number;
  batchIDs: number[];
  amounts: number[];
  salt: string;
  deadline: number;
  status: MintStatus;
  type: MintType;
  signature: string;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
  info: InfoPendingMintDto[];
}

export interface BodyUpdatePendingMint {
  publicAddress: string;
  id: number;
  status: MintStatus;
}

export interface PendingMint {
  id: number;
  to: string;
  batchID: number;
  amount: number;
  batchIDs: number[];
  amounts: number[];
  salt: string;
  deadline: number;
  status: MintStatus;
  type: MintType;
  signature: string;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
}

export interface ERC1155LootboxAttribute {
  id: number;
  trait_type: string;
  value: string;
  erc1155: ERC1155Lootbox;

  /** @format date-time */
  createdAt: string;
}

export interface Lootbox {
  id: number;
  publicAddress: string;
  quantity: number;
  tokenId: number;
  mintable: number;
  propertyLootbox: ERC1155Lootbox;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
}

export interface ClaimableLootbox {
  id: number;
  publicAddress: string;
  quantity: number;
  tokenId: number;
  propertyLootbox: ERC1155Lootbox;

  /** @format date-time */
  expiredDate: string;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
}

export interface ERC1155Lootbox {
  id: number;
  tokenId: string;
  name: string;
  description: string;
  external_url: string;
  image: string;
  attributes: ERC1155LootboxAttribute[];
  lootboxs: Lootbox[];
  claimableLootboxs: ClaimableLootbox[];

  /** @format date-time */
  createdAt: string;
}

export interface MintBatchLootboxInputDto {
  publicAddress: string;
  batchID: number[];
  amount: number[];
}

export interface MintLootboxInputDto {
  publicAddress: string;
  batchID: number;
  amount: number;
}

export interface DistributeLootbox {
  publicAddress: string;
  tokenId: number;
  quantity: number;
  expiredDate: number;
}

export interface DistributeLootboxs {
  data: DistributeLootbox[];
}

export type Any = object;

export enum CollectionCategory {
  Character = 'character',
  Sculpture = 'sculpture',
  Lootbox = 'lootbox',
  Spaceship = 'spaceship',
}

export enum CollectionType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export interface Portfolio {
  id: string;
  name: string;
  collectionSlug: string;
  chainId: number;
  collectionType: CollectionType;
  category: CollectionCategory;
  floorPrice: number;
  totalVolume: number;
  marketCap: number;
  totalSupply: number;
  totalSales: number;
  description: string;
  logoImage: string;
  bannerImage: string;
  siteUrl: string;
  isVerified: boolean;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
  total: number;
}

export interface SipherCollection {
  id: string;
  name: string;
  collectionSlug: string;
  chainId: number;
  collectionType: CollectionType;
  category: CollectionCategory;
  floorPrice: number;
  totalVolume: number;
  marketCap: number;
  totalSupply: number;
  totalSales: number;
  description: string;
  logoImage: string;
  bannerImage: string;
  siteUrl: string;
  isVerified: boolean;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
}

export interface NftItemAttribute {
  trait_type: string;
  value: string;
  percentage: number;
}

export interface Erc1155Owner {
  publicAddress: string;
  totalOwned: number;
}

export interface NftItem {
  id: string;
  collectionId: string;
  tokenId: string;
  tokenUri: string;
  chainId: string;
  attributes: NftItemAttribute[];
  imageUrl: string;
  name: string;
  owner: string;
  creator: string;
  viewCount: number;
  imageThumbnailUrl: string;
  rarityRank: number;
  rarityScore: number;
  value: number;
  quantity: number;
  allOwner: Erc1155Owner[];
  collection: SipherCollection;
}

export interface PortfolioByCollectionResponse {
  collection: SipherCollection;
  total: number;
  items: NftItem;
}

export enum ItemType {
  Bomber = 'Bomber',
  Hoodie = 'Hoodie',
  Tshirt = 'Tshirt',
  Hat = 'Hat',
  Card = 'Card',
}

export enum ViewType {
  SIPHERExclusiveBomber = 'SIPHER Exclusive Bomber',
  SIPHERExclusiveHoodie = 'SIPHER Exclusive Hoodie',
  SIPHERExclusiveTShirt = 'SIPHER Exclusive T-shirt',
  SIPHERExclusiveHat = 'SIPHER Exclusive Hat',
  ThankYouCard = 'Thank You Card',
}

export interface Merchandise {
  id: number;
  publicAddress: string;
  tier: string;
  merch_item: string;
  quantity: number;
  quantity_shipped: number;
  isShipped: boolean;
  isShip: boolean;
  item: Item;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
}

export interface Item {
  id: number;
  merch_item: ItemType;
  name: ViewType;
  type: string;
  description: string;
  imageUrls: ImageUrl[];
  merchandise: Merchandise[];
  size: string[] | null;
  color: string[] | null;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
}

export interface ImageUrl {
  id: number;
  color: string;
  default: string;
  front: string;
  back: string;
  left: string;
  right: string;
  top: string;
  bot: string;
  airdrop: Airdrop;
  item: Item;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
}

export enum AirdropType {
  NFT = 'NFT',
  TOKEN = 'TOKEN',
  MERCH = 'MERCH',
  ALL = 'ALL',
  OTHER = 'OTHER',
}

export interface Airdrop {
  id: number;
  merkleRoot: string;
  proof: string[];
  leaf: string;
  claimer: string;
  addressContract: string;
  imageUrls: ImageUrl[];
  totalAmount: string;
  type: AirdropType;
  startTime: string;
  vestingInterval: string;
  name: string;
  description: string;
  numberOfVestingPoint: string;

  /** @format date-time */
  createdAt: string;

  /** @format date-time */
  updatedAt: string;
}

export interface ResAllAirdrop {
  token: Airdrop[];
  nft: Airdrop[];
  merchandise: Airdrop[];
  other: Airdrop[];
}

export interface ResAirdrop {
  id: number;
  name: string;
  description: string;
  imageUrls: ImageUrl[];
  size: string[] | null;
  color: string[] | null;
  type: string;
}

export interface PriceData {
  usd: number;
  eth: number;
  change: number;
}

export interface PriceDatas {
  sipherPrice: PriceData;
  ethereumPrice: PriceData;
  maticPrice: PriceData;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;

    this.instance.defaults.headers.common = { Accept: '*/*' };
    this.instance.defaults.headers.post = {};
    this.instance.defaults.headers.put = {};
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = (params1.method || params2?.method || 'get').toLowerCase();
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers?.common || {}),
        ...(this.instance.defaults.headers?.[method] || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(key, property instanceof Blob ? property : typeof property === 'object' && property !== null ? JSON.stringify(property) : `${property}`);
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams = ((typeof secure === 'boolean' ? secure : this.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Sipher Loyalty
 * @version 1.0
 * @contact
 *
 * Sipher loyalty API documents
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags check
     * @name AppControllerGetHello
     * @request GET:/api/sipher/loyalty
     */
    appControllerGetHello: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags nft
     * @name NftItemControllerGetByCollection
     * @request GET:/api/sipher/loyalty/nft/get-by-collection/{id}
     */
    nftItemControllerGetByCollection: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/nft/get-by-collection/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags mint
     * @name MintControllerGetPendingLootbox
     * @request GET:/api/sipher/loyalty/mint/pending/lootbox/{publicAddress}
     * @secure
     */
    mintControllerGetPendingLootbox: (publicAddress: string, params: RequestParams = {}) =>
      this.request<ResPendingMintDto[], any>({
        path: `/api/sipher/loyalty/mint/pending/lootbox/${publicAddress}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags mint
     * @name MintControllerUpdateStatusPendingLootbox
     * @request PUT:/api/sipher/loyalty/mint/pending/status
     * @secure
     */
    mintControllerUpdateStatusPendingLootbox: (data: BodyUpdatePendingMint, params: RequestParams = {}) =>
      this.request<PendingMint, any>({
        path: `/api/sipher/loyalty/mint/pending/status`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerGetLootboxById
     * @request GET:/api/sipher/loyalty/lootbox/get-by-walllet/{publicAddress}/{id}
     * @secure
     */
    lootBoxControllerGetLootboxById: (publicAddress: string, id: string, params: RequestParams = {}) =>
      this.request<Lootbox, any>({
        path: `/api/sipher/loyalty/lootbox/get-by-walllet/${publicAddress}/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerGetLootboxFromWallet
     * @request GET:/api/sipher/loyalty/lootbox/get-by-walllet/{publicAddress}
     * @secure
     */
    lootBoxControllerGetLootboxFromWallet: (publicAddress: string, params: RequestParams = {}) =>
      this.request<Lootbox[], any>({
        path: `/api/sipher/loyalty/lootbox/get-by-walllet/${publicAddress}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerGetClaimableLootboxFromWallet
     * @request GET:/api/sipher/loyalty/lootbox/get-by-walllet/claimable/{publicAddress}
     * @secure
     */
    lootBoxControllerGetClaimableLootboxFromWallet: (publicAddress: string, params: RequestParams = {}) =>
      this.request<ClaimableLootbox[], any>({
        path: `/api/sipher/loyalty/lootbox/get-by-walllet/claimable/${publicAddress}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerGetLootboxFromUserId
     * @request GET:/api/sipher/loyalty/lootbox/get-by-userId
     * @secure
     */
    lootBoxControllerGetLootboxFromUserId: (params: RequestParams = {}) =>
      this.request<Lootbox[], any>({
        path: `/api/sipher/loyalty/lootbox/get-by-userId`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerGetClaimableLootboxFromUserId
     * @request GET:/api/sipher/loyalty/lootbox/get-by-userId/claimable
     * @secure
     */
    lootBoxControllerGetClaimableLootboxFromUserId: (params: RequestParams = {}) =>
      this.request<ClaimableLootbox[], any>({
        path: `/api/sipher/loyalty/lootbox/get-by-userId/claimable`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerMintBatchLootbox
     * @request PUT:/api/sipher/loyalty/lootbox/mint-batch
     * @secure
     */
    lootBoxControllerMintBatchLootbox: (data: MintBatchLootboxInputDto, params: RequestParams = {}) =>
      this.request<PendingMint, any>({
        path: `/api/sipher/loyalty/lootbox/mint-batch`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerMintLootbox
     * @request PUT:/api/sipher/loyalty/lootbox/mint
     * @secure
     */
    lootBoxControllerMintLootbox: (data: MintLootboxInputDto, params: RequestParams = {}) =>
      this.request<PendingMint, any>({
        path: `/api/sipher/loyalty/lootbox/mint`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerClaim
     * @request PUT:/api/sipher/loyalty/lootbox/claim-lootbox/{publicAddress}
     * @secure
     */
    lootBoxControllerClaim: (publicAddress: string, params: RequestParams = {}) =>
      this.request<ClaimableLootbox[], any>({
        path: `/api/sipher/loyalty/lootbox/claim-lootbox/${publicAddress}`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerDistributeLootbox
     * @request PUT:/api/sipher/loyalty/lootbox/distribute
     */
    lootBoxControllerDistributeLootbox: (data: DistributeLootboxs, params: RequestParams = {}) =>
      this.request<Any, any>({
        path: `/api/sipher/loyalty/lootbox/distribute`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags uri
     * @name UriControllerGetDataErc1155Lootbox
     * @request GET:/api/sipher/loyalty/uri/erc1155-lootbox/{tokenId}
     */
    uriControllerGetDataErc1155Lootbox: (tokenId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/uri/erc1155-lootbox/${tokenId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags uri
     * @name UriControllerGetDataErc1155Sculpture
     * @request GET:/api/sipher/loyalty/uri/erc1155-sculpture/{tokenId}
     */
    uriControllerGetDataErc1155Sculpture: (tokenId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/uri/erc1155-sculpture/${tokenId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags collection
     * @name CollectionControllerGetAllCollections
     * @request GET:/api/sipher/loyalty/collection
     */
    collectionControllerGetAllCollections: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/collection`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags collection
     * @name CollectionControllerGetUserCollection
     * @request GET:/api/sipher/loyalty/collection/portfolio/{userAddress}
     * @secure
     */
    collectionControllerGetUserCollection: (userAddress: string, query?: { category?: CollectionCategory; chainId?: string }, params: RequestParams = {}) =>
      this.request<Portfolio[], any>({
        path: `/api/sipher/loyalty/collection/portfolio/${userAddress}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags collection
     * @name CollectionControllerGetPortfolioByCollection
     * @request GET:/api/sipher/loyalty/collection/{collectionId}/portfolio/{userAddress}
     * @secure
     */
    collectionControllerGetPortfolioByCollection: (userAddress: string, collectionId: string, params: RequestParams = {}) =>
      this.request<PortfolioByCollectionResponse, any>({
        path: `/api/sipher/loyalty/collection/${collectionId}/portfolio/${userAddress}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags collection
     * @name CollectionControllerGetItemById
     * @request GET:/api/sipher/loyalty/collection/portfolio/{userAddress}/nft-item/{itemId}
     * @secure
     */
    collectionControllerGetItemById: (userAddress: string, itemId: string, params: RequestParams = {}) =>
      this.request<NftItem, any>({
        path: `/api/sipher/loyalty/collection/portfolio/${userAddress}/nft-item/${itemId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags collection
     * @name CollectionControllerGetCollectionStat
     * @request GET:/api/sipher/loyalty/collection/{collectionSlug}/stats
     */
    collectionControllerGetCollectionStat: (collectionSlug: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/collection/${collectionSlug}/stats`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags airdrop
     * @name AirdropControllerGetAirdropsByType
     * @request GET:/api/sipher/loyalty/airdrop/{airdropType}/{publicAddress}
     * @secure
     */
    airdropControllerGetAirdropsByType: (publicAddress: string, airdropType: string, params: RequestParams = {}) =>
      this.request<ResAllAirdrop, any>({
        path: `/api/sipher/loyalty/airdrop/${airdropType}/${publicAddress}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags airdrop
     * @name AirdropControllerGetAirdropByType
     * @request GET:/api/sipher/loyalty/airdrop/{airdropType}/{publicAddress}/{id}
     * @secure
     */
    airdropControllerGetAirdropByType: (publicAddress: string, id: string, airdropType: string, params: RequestParams = {}) =>
      this.request<ResAirdrop, any>({
        path: `/api/sipher/loyalty/airdrop/${airdropType}/${publicAddress}/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags sculpture
     * @name SculptureControllerGetUserOwnedCode
     * @request GET:/api/sipher/loyalty/sculpture/transaction/{ownerAddress}
     */
    sculptureControllerGetUserOwnedCode: (ownerAddress: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/sculpture/transaction/${ownerAddress}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags price
     * @name PriceControllerGetPrice
     * @request GET:/api/sipher/loyalty/price
     * @secure
     */
    priceControllerGetPrice: (params: RequestParams = {}) =>
      this.request<PriceDatas, any>({
        path: `/api/sipher/loyalty/price`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
