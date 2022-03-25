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
  Pending = 'Pending',
  Minted = 'Minted',
  Canceled = 'Canceled',
  Expired = 'Expired',
}

export enum MintType {
  Lootbox = 'Lootbox',
  SpaceshipPart = 'SpaceshipPart',
  Spaceship = 'Spaceship',
}

export interface InfoPendingMintDto {
  image: string;
  tokenId: number;
  quantity: number;
}

export interface ResPendingMintDto {
  id: string;
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
  info: InfoPendingMintDto[];
}

export interface ERC1155LootboxAttribute {
  id: string;
  trait_type: string;
  value: string;
  erc1155: ERC1155Lootbox;

  /** @format date-time */
  createdAt: string;
}

export interface Lootbox {
  id: string;
  publicAddress: string;
  quantity: number;
  tokenId: number;
  pending: number;
  mintable: number;
  propertyLootbox: ERC1155Lootbox;

  /** @format date-time */
  createdAt: string;
}

export interface ClaimableLootbox {
  id: string;
  publicAddress: string;
  quantity: number;
  tokenId: number;
  propertyLootbox: ERC1155Lootbox;

  /** @format date-time */
  expiredDate: string;

  /** @format date-time */
  createdAt: string;
}

export interface ERC1155Lootbox {
  id: string;
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

export interface PendingMint {
  id: string;
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
}

export interface MintLootboxInputDto {
  publicAddress: string;
  batchID: number;
  amount: number;
}

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

export enum AirdropType {
  NFT = 'NFT',
  TOKEN = 'TOKEN',
  MERCH = 'MERCH',
  ALL = 'ALL',
}

export interface Airdrop {
  id: string;
  merkleRoot: string;
  proof: string[];
  leaf: string;
  claimer: string;
  addressContract: string;
  imageUrl: string;
  totalAmount: string;
  type: AirdropType;
  startTime: string;
  vestingInterval: string;
  numberOfVestingPoint: string;

  /** @format date-time */
  created: string;
}

export interface ResAllAirdrop {
  token: Airdrop[];
  nft: Airdrop[];
}

export type EtherDto = object;

export type BioDto = object;

export interface PriceData {
  usd: number;
  eth: number;
  change: number;
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
     * @name NftItemControllerGetByOwner
     * @request GET:/api/sipher/loyalty/nft/get-by-owner
     */
    nftItemControllerGetByOwner: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/nft/get-by-owner`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags nft
     * @name NftItemControllerGetByCollection
     * @request GET:/api/sipher/loyalty/nft/get-by-collection
     */
    nftItemControllerGetByCollection: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/nft/get-by-collection`,
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
     * @tags uri
     * @name UriControllerGetDataErc1155Spaceship
     * @request GET:/api/sipher/loyalty/uri/erc1155-lootbox/{tokenId}
     */
    uriControllerGetDataErc1155Spaceship: (tokenId: number, params: RequestParams = {}) =>
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
     * @name AirdropControllerGetAirdropByType
     * @request GET:/api/sipher/loyalty/airdrop/{airdropType}/{publicAddress}
     * @secure
     */
    airdropControllerGetAirdropByType: (publicAddress: string, airdropType: string, params: RequestParams = {}) =>
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
     * @name AirdropControllerClaimMerch
     * @request PUT:/api/sipher/loyalty/airdrop/merch/claim/{publicAddress}/{id_merch}
     * @secure
     */
    airdropControllerClaimMerch: (publicAddress: string, idMerch: string, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/api/sipher/loyalty/airdrop/merch/claim/${publicAddress}/${idMerch}`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags airdrop
     * @name AirdropControllerGetAllMerch
     * @request GET:/api/sipher/loyalty/airdrop/all-merch
     */
    airdropControllerGetAllMerch: (query: { publicAddress: string }, params: RequestParams = {}) =>
      this.request<EtherDto, any>({
        path: `/api/sipher/loyalty/airdrop/all-merch`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags sculpture
     * @name SculptureControllerGetUserOwnedCode
     * @request GET:/api/sipher/loyalty/sculpture/shopify-code/{ownerAddress}
     */
    sculptureControllerGetUserOwnedCode: (ownerAddress: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/sculpture/shopify-code/${ownerAddress}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerUploadImg
     * @request POST:/api/sipher/loyalty/user/upload-image
     */
    userControllerUploadImg: (data: { file?: File }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/upload-image`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerUploadBio
     * @request POST:/api/sipher/loyalty/user/update-bio
     */
    userControllerUploadBio: (data: BioDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/update-bio`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerGetPriceCoinMarketCap
     * @request GET:/api/sipher/loyalty/user/get-sipher-statics
     */
    userControllerGetPriceCoinMarketCap: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/get-sipher-statics`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name PriceControllerGetPrice
     * @request GET:/api/sipher/loyalty/price
     * @secure
     */
    priceControllerGetPrice: (params: RequestParams = {}) =>
      this.request<PriceData, any>({
        path: `/api/sipher/loyalty/price`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
