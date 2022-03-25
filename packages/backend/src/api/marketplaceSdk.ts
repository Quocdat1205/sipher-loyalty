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

export interface HealthCheckResult {
  uptime: number;
}

export interface User {
  /** User wallet address */
  id: string;
  email: string;
  name: string;
  bio: string;
  avatarImage: string;
  profileImage: string;
  isVerified: boolean;
  isBanned: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ProfileDto {
  user: User;
  inventory: number;
  favorited: number;
  offersMade: number;
  offersReceived: number;
}

export interface UpdateUserReqDto {
  name?: string;
  bio?: string;
  email?: string;
  avatarImage?: string;
  profileImage?: string;
}

export interface FileUploadDto {
  /** @format binary */
  file: File;
}

export interface LoginMessageResponseDto {
  message: string;
  time: string;
}

export interface LoginRequestDto {
  wallet: string;
  time: string;
  signature: string;
}

export interface LoginResponseDto {
  token: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  includes?: string[];
}

export enum AuctionStatus {
  Pending = 'Pending',
  Open = 'Open',
  Ended = 'Ended',
  Finalized = 'Finalized',
  Canceled = 'Canceled',
  Expired = 'Expired',
  Invalidated = 'Invalidated',
}

export interface Auction {
  id: string;
  owner: string;
  contract: string;
  tokenId: string;
  itemId: string;
  status: AuctionStatus;
  start: number;
  end: number;

  /** The payment token/contract */
  currency: string;

  /** The starting value in Wei */
  startingValue: string;

  /** The starting value in Ether */
  startingValueDecimal: number;

  /** The starting value in USD */
  startingValueUsd: number;

  /** The last bid value in Wei */
  lastBidValue?: string;

  /** The last bid value in Ether */
  lastBidValueDecimal?: number;

  /** The last bid value in USD */
  lastBidValueUsd: number;

  /** The signature of owner */
  signature: string;
  transactionHash: string;
  createdAt: number;
  updatedAt: number;
}

export enum OrderDataType {
  DATAV2TYPE = 'DATA_V2_TYPE',
}

export interface FeeReceiver {
  account: string;
  value: number;
}

export interface OrderData {
  dataType: OrderDataType;
  originFees: FeeReceiver[];
  payouts: FeeReceiver[];
  isMakeFill: boolean;
}

export interface EthAssetType {
  assetClass: string;
}

export interface Erc20AssetType {
  assetClass: string;
  contract: string;
}

export interface Erc721AssetType {
  assetClass: string;
  contract: string;
  tokenId: string;
}

export interface Erc1155AssetType {
  assetClass: string;
  contract: string;
  tokenId: string;
}

export interface OrderAsset {
  assetType: EthAssetType | Erc20AssetType | Erc721AssetType | Erc1155AssetType;
  value: string;
}

export enum OrderStatus {
  Open = 'Open',
  Completed = 'Completed',
  Canceled = 'Canceled',
  Invalidated = 'Invalidated',
  Expired = 'Expired',
}

export enum OrderType {
  SIPHERV2 = 'SIPHER_V2',
}

export enum OrderSide {
  Bid = 'Bid',
  Ask = 'Ask',
  Offer = 'Offer',
}

export interface Order {
  hash: string;
  itemId: string;
  collectionId: string;
  data: OrderData;
  makeAsset: OrderAsset;
  takeAsset: OrderAsset;
  encodedData: object;
  maker: string;
  taker: string;
  auctionId: string;
  salt: string;
  signature: string;
  status: OrderStatus;
  fill: number;
  balance: number;
  currency: string;
  price: string;
  priceDecimal: number;

  /** USD value, this field is calculated automatically when order is matched */
  priceUsd: number;
  type: OrderType;
  side: OrderSide;
  start: number;
  end: number;
  sold: number;
  transactionHash?: string;
  createdAt: number;
  updatedAt: number;
}

export interface UpsertAuctionDto {
  id?: string;
  contract: string;
  tokenId: string;
  currency: string;
  itemId?: string;
  auctionId?: string;
  startingValue: string;
  owner: string;
  signature: string;
  start: number;
  end: number;
}

export interface OrderFilterResDto {
  data: Order[];
  total: number;
}

export interface OrderWithNftInfoDto {
  offer?: Order;
  imageUrl?: string;
  imageThumbnailUrl?: string;
  name: string;
}

export interface OrderWithNftInfoFilterResDto {
  data: OrderWithNftInfoDto[];
  total: number;
}

export interface UpsertOrderDto {
  hash?: string;
  itemId?: string;
  side: OrderSide;
  data: OrderData;
  makeAsset: OrderAsset;
  takeAsset: OrderAsset;
  maker: string;
  taker: string;
  auctionId?: string;
  salt: string;
  signature: string;
  start: number;
  end: number;
}

export interface OrderHistoryFilterDto {
  from?: number;
  take?: number;
  itemId?: string;
  collectionId?: string;
  status?: OrderStatus;
  statuses?: OrderStatus[];
  side?: OrderSide;
  maker?: string;
  taker?: string;

  /** @format date-time */
  startBefore?: string;

  /** @format date-time */
  endBefore?: string;

  /** @format date-time */
  endAfter?: string;
  sort?: 'start' | 'end' | 'sold';
  order?: 'asc' | 'desc';
}

export interface OrderHistory {
  hash: string;
  itemId: string;
  collectionId: string;
  data: OrderData;
  makeAsset: OrderAsset;
  takeAsset: OrderAsset;
  maker: string;
  taker: string;
  auctionId: string;
  salt: string;
  signature: string;
  status: OrderStatus;
  fill: number;
  balance: number;
  currency: string;
  price: string;
  priceDecimal: number;

  /** USD value, this field is calculated automatically when order is matched */
  priceUsd: number;
  type: OrderType;
  side: OrderSide;
  start: number;
  end: number;
  sold: number;
  transactionHash: string;
  createdAt: number;
  updatedAt: number;
}

export interface OrderHistoryFilterResDto {
  data: OrderHistory[];
  total: number;
}

export interface OrderPriceHistory {
  itemId: string;
  date: number;
  maker: string;
  taker: string;
  price: string;
  priceDecimal: number;
  priceUsd: number;
  currency: string;
}

export interface NftAttributeValue {
  value: string;
  count: number;
}

export interface CollectionAttribute {
  collectionId: string;
  trait_type: string;
  values: NftAttributeValue[];
}

export interface GetNftAttributesRespDto {
  hasNext?: boolean;
  next?: string;
  data: CollectionAttribute[];
}

export enum Chain {
  Mainnet = 'Mainnet',
  Rinkeby = 'Rinkeby',
  Polygon = 'Polygon',
  Mumbai = 'Mumbai',
}

export interface Collection {
  id: string;
  name: string;
  owner: string;
  chainId: Chain;
  type: string;
  email: string;
  description: string;
  category: string;
  logoImage: string;
  bannerImage: string;
  siteUrl: string;
  discord: string;
  twitter: string;
  instagram: string;
  medium: string;
  telegram: string;
  royalty: number;
  lastDayVolumeChange: number;
  lastDayVolumeChangeUsd: number;
  volume: number;
  volumeUsd: number;
  floorPrice: number;
  floorPriceUsd: number;
  totalItems: number;
  totalOwners: number;
  isVerified: boolean;
  feeRecipient: string;
  createdAt: number;
  updatedAt: number;
}

export interface GetCollectionRespDto {
  hasNext?: boolean;
  next?: string;
  data: Collection[];
}

export enum NftType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export interface OrderPrice {
  orderId: string;

  /** Current price in wei */
  price: string;

  /** Current price in Ether */
  priceDecimal: number;

  /** Current price in USD */
  priceUsd: number;
  currency: string;
  side: OrderSide;
  maker: string;
  end: number;
}

export interface NftItemAttribute {
  trait_type: string;
  value: string;
}

export interface NftItem {
  id: string;
  collectionId: string;
  tokenId: string;
  type: NftType;
  value: number;
  chainId: Chain;
  name: string;
  owner: string;
  creator: string;

  /** Current order & price, this field is updated automatically */
  order?: OrderPrice;

  /** Last sold price in Ether, this field is updated automatically when matching order */
  lastPrice?: number;

  /** Last sold price in USD, this field is updated automatically when matching order */
  lastPriceUsd?: number;

  /** Last sold currency */
  lastCurrency?: string;
  tokenUri: string;
  imageUrl: string;
  imageThumbnailUrl: string;
  attributes: NftItemAttribute[];
  viewCount: number;
  favoriteCount: number;
  rarity?: string;
  rarityRank?: number;
  rarityScore?: number;
  favorited: boolean;
}

export enum NftItemListingType {
  BuyNow = 'BuyNow',
  OnAuction = 'OnAuction',
  HasOffer = 'HasOffer',
  HasBid = 'HasBid',
}

export interface NftItemAttributeFilterDto {
  trait_type: string;
  values: string[];
}

export enum NftItemFilterOrder {
  MostViewed = 'MostViewed',
  MostFavorited = 'MostFavorited',
  PriceAsc = 'PriceAsc',
  PriceDesc = 'PriceDesc',
  RarityAsc = 'RarityAsc',
  RarityDesc = 'RarityDesc',
  RecentlyListed = 'RecentlyListed',
  EndingSoon = 'EndingSoon',
}

export interface NftItemFilterDto {
  from?: number;
  take?: number;
  owner?: string;
  favoritor?: string;
  collections?: string[];
  listingTypes?: NftItemListingType[];
  rarities?: string[];
  currency?: string;

  /** @min 0 */
  priceFrom?: number;

  /** @min 0 */
  priceTo?: number;
  attributes?: NftItemAttributeFilterDto[];
  orderBy?: NftItemFilterOrder;
}

export interface SearchNftItemRespDto {
  data: NftItem[];
  total: number;
}

export interface PagingEsDto {
  from?: number;
  take?: number;
}

export interface SearchNftItemImageRespDto {
  data?: string[];
  total?: number;
}

export interface GetNftImageByAddressReqDto {
  from?: number;
  take?: number;
  wallets: string[];
}

export interface GetNftImageByAddressRespDto {
  id: string;
  imageUrl: string;
  imageThumbnailUrl: string;
}

export interface NftItemPercentageAttribute {
  trait_type: string;
  value: string;
  percentage: number;
}

export interface PriceNftHistoryGroupByDateResDto {
  date: number;
  avgPrice: number;
  avgPriceUsd: number;
  volume: number;
  volumeUsd: number;
  numOfSales: number;
}

export interface NftItemDetailsRespDto {
  item: NftItem;
  collection: Collection;
  attributes: NftItemPercentageAttribute[];
  listing?: Order;
  auction?: Auction;
  offers?: Order[];
  bids?: Order[];
  users: User[];
  history: OrderPriceHistory[];
  historyGroupByDate: PriceNftHistoryGroupByDateResDto[];
}

export enum Activity {
  Mint = 'Mint',
  Transfer = 'Transfer',
  ListForSale = 'ListForSale',
  CancelSale = 'CancelSale',
  ListForAuction = 'ListForAuction',
  CancelAuction = 'CancelAuction',
  Sale = 'Sale',
}

export interface ActivityLogFilterDto {
  from?: number;
  take?: number;
  owner: string;
  itemId?: string;
  activities?: Activity[];
}

export interface ActivityLog {
  id: string;
  transactionHash: string;
  activity: Activity;
  itemId: string;
  collectionId: string;
  currency: string;
  price: string;
  priceDecimal: number;
  priceUsd: number;
  from: string;
  to: string;
  timestamp: number;
}

export interface ActivityLogFilterResDto {
  data: ActivityLog[];
  total: number;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
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

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
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

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
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

  private mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
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
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === 'object' && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
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
 * @title Sipher Markerplace API
 * @version 1.0.0
 * @contact
 *
 * Powered by Sipher
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags health
     * @name HealthControllerCheck
     * @request GET:/api/health
     */
    healthControllerCheck: (params: RequestParams = {}) =>
      this.request<
        HealthCheckResult,
        {
          status?: string;
          info?: Record<string, { status?: string }>;
          error?: Record<string, { status?: string }>;
          details?: Record<string, { status?: string }>;
        }
      >({
        path: `/api/health`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerGetById
     * @request GET:/api/user/{id}
     */
    userControllerGetById: (id: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerGetProfile
     * @request GET:/api/user/profile
     * @secure
     */
    userControllerGetProfile: (params: RequestParams = {}) =>
      this.request<ProfileDto, any>({
        path: `/api/user/profile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerGetProfileById
     * @request GET:/api/user/profile/{userId}
     * @secure
     */
    userControllerGetProfileById: (userId: string, params: RequestParams = {}) =>
      this.request<ProfileDto, any>({
        path: `/api/user/profile/${userId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserControllerUpdate
     * @request PUT:/api/user
     * @secure
     */
    userControllerUpdate: (data: UpdateUserReqDto, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user`,
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
     * @tags user
     * @name UserControllerUploadBanner
     * @request POST:/api/user/upload/banner
     * @secure
     */
    userControllerUploadBanner: (data: FileUploadDto, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/upload/banner`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerGetLoginMessage
     * @request GET:/api/auth/message
     */
    authControllerGetLoginMessage: (query: { wallet: string }, params: RequestParams = {}) =>
      this.request<LoginMessageResponseDto, any>({
        path: `/api/auth/message`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @request POST:/api/auth/login
     */
    authControllerLogin: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto, any>({
        path: `/api/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogout
     * @request POST:/api/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/auth/logout`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerMe
     * @request GET:/api/auth/me
     * @secure
     */
    authControllerMe: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/auth/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerAllRoles
     * @request GET:/api/auth/roles
     * @secure
     */
    authControllerAllRoles: (params: RequestParams = {}) =>
      this.request<Role[], any>({
        path: `/api/auth/roles`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auction
     * @name AuctionControllerGetCurrentAuction
     * @request GET:/api/auction/item/{itemId}
     */
    auctionControllerGetCurrentAuction: (itemId: string, params: RequestParams = {}) =>
      this.request<Auction, any>({
        path: `/api/auction/item/${itemId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auction
     * @name AuctionControllerGetBidsByAuctionId
     * @request GET:/api/auction/{auctionId}/bids
     */
    auctionControllerGetBidsByAuctionId: (auctionId: string, params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/api/auction/${auctionId}/bids`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auction
     * @name AuctionControllerGetTopBidByAuctionId
     * @request GET:/api/auction/{auctionId}/bids/top
     */
    auctionControllerGetTopBidByAuctionId: (auctionId: string, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/auction/${auctionId}/bids/top`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auction
     * @name AuctionControllerGetMessageToSign
     * @request POST:/api/auction/message
     */
    auctionControllerGetMessageToSign: (data: UpsertAuctionDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/auction/message`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auction
     * @name AuctionControllerListing
     * @request POST:/api/auction/list
     */
    auctionControllerListing: (data: UpsertAuctionDto, params: RequestParams = {}) =>
      this.request<Auction, any>({
        path: `/api/auction/list`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerGetById
     * @request GET:/api/order/{hash}
     */
    orderControllerGetById: (hash: string, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/order/${hash}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerGetCurrentSellOrderByItemId
     * @request GET:/api/order/ask/{itemId}
     */
    orderControllerGetCurrentSellOrderByItemId: (itemId: string, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/order/ask/${itemId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerGetOffersByItemId
     * @request GET:/api/order/offers/{itemId}
     */
    orderControllerGetOffersByItemId: (itemId: string, params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/api/order/offers/${itemId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerGetOffersMadeByUser
     * @request GET:/api/order/offers/made/{userId}
     */
    orderControllerGetOffersMadeByUser: (userId: string, params: RequestParams = {}) =>
      this.request<OrderFilterResDto, any>({
        path: `/api/order/offers/made/${userId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerGetOffersMadeWithNftInfo
     * @request GET:/api/order/offers/made/details
     */
    orderControllerGetOffersMadeWithNftInfo: (params: RequestParams = {}) =>
      this.request<OrderWithNftInfoFilterResDto, any>({
        path: `/api/order/offers/made/details`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerGetOffersReceivedByUser
     * @request GET:/api/order/offers/received/{userId}
     */
    orderControllerGetOffersReceivedByUser: (userId: string, params: RequestParams = {}) =>
      this.request<OrderFilterResDto, any>({
        path: `/api/order/offers/received/${userId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerGetOffersReceivedWithNftInfo
     * @request GET:/api/order/offers/received/details
     */
    orderControllerGetOffersReceivedWithNftInfo: (params: RequestParams = {}) =>
      this.request<OrderWithNftInfoFilterResDto, any>({
        path: `/api/order/offers/received/details`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerGetBidsByItemId
     * @request GET:/api/order/bids/{itemId}
     */
    orderControllerGetBidsByItemId: (itemId: string, params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/api/order/bids/${itemId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerToSignDataCreate
     * @request POST:/api/order/to-sign
     */
    orderControllerToSignDataCreate: (data: UpsertOrderDto, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/order/to-sign`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerListing
     * @request POST:/api/order/list
     */
    orderControllerListing: (data: UpsertOrderDto, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/order/list`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerOffer
     * @request POST:/api/order/offer
     */
    orderControllerOffer: (data: UpsertOrderDto, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/order/offer`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrderControllerBid
     * @request POST:/api/order/bid
     */
    orderControllerBid: (data: UpsertOrderDto, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/order/bid`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders/history
     * @name OrderHistoryControllerGetByHash
     * @request GET:/api/orders/history/{hash}
     */
    orderHistoryControllerGetByHash: (hash: string, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/api/orders/history/${hash}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders/history
     * @name OrderHistoryControllerSearch
     * @request POST:/api/orders/history/search
     */
    orderHistoryControllerSearch: (data: OrderHistoryFilterDto, params: RequestParams = {}) =>
      this.request<OrderHistoryFilterResDto, any>({
        path: `/api/orders/history/search`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders/history
     * @name OrderHistoryControllerGetPricerHistoryByItemId
     * @request GET:/api/orders/history/price/{itemId}
     */
    orderHistoryControllerGetPricerHistoryByItemId: (itemId: string, params: RequestParams = {}) =>
      this.request<OrderPriceHistory[], any>({
        path: `/api/orders/history/price/${itemId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags collection-attribute
     * @name CollectionAttributeControllerGetAll
     * @request GET:/api/collections/attributes
     * @secure
     */
    collectionAttributeControllerGetAll: (
      query?: { collectionId?: string; trait_type?: string },
      params: RequestParams = {},
    ) =>
      this.request<GetNftAttributesRespDto, any>({
        path: `/api/collections/attributes`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags collection-attribute
     * @name CollectionAttributeControllerSyncAttributesByCollectionId
     * @request GET:/api/collections/attributes/sync/{collectionId}
     * @secure
     */
    collectionAttributeControllerSyncAttributesByCollectionId: (
      collectionId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/collections/attributes/sync/${collectionId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags collections
     * @name CollectionControllerGetAll
     * @request GET:/api/collections
     */
    collectionControllerGetAll: (
      query?: {
        take?: number;
        from?: string;
        type?: 'ERC721' | 'ERC1155';
        category?: 'Character' | 'Weapon';
      },
      params: RequestParams = {},
    ) =>
      this.request<GetCollectionRespDto, any>({
        path: `/api/collections`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags collections
     * @name CollectionControllerGetById
     * @request GET:/api/collections/{id}
     */
    collectionControllerGetById: (id: string, params: RequestParams = {}) =>
      this.request<Collection, any>({
        path: `/api/collections/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags nftitems
     * @name NftItemControllerGetById
     * @request GET:/api/nftitems/{itemId}
     */
    nftItemControllerGetById: (itemId: string, params: RequestParams = {}) =>
      this.request<NftItem, any>({
        path: `/api/nftitems/${itemId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags nftitems
     * @name NftItemControllerSearch
     * @request POST:/api/nftitems/search
     */
    nftItemControllerSearch: (data: NftItemFilterDto, params: RequestParams = {}) =>
      this.request<SearchNftItemRespDto, any>({
        path: `/api/nftitems/search`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags nftitems
     * @name NftItemControllerGetOwnedNftImages
     * @request POST:/api/nftitems/search/owned-image
     * @secure
     */
    nftItemControllerGetOwnedNftImages: (data: PagingEsDto, params: RequestParams = {}) =>
      this.request<SearchNftItemImageRespDto, any>({
        path: `/api/nftitems/search/owned-image`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags nftitems
     * @name NftItemControllerGetNftImagesByAddress
     * @request POST:/api/nftitems/search/image
     */
    nftItemControllerGetNftImagesByAddress: (
      data: GetNftImageByAddressReqDto,
      params: RequestParams = {},
    ) =>
      this.request<GetNftImageByAddressRespDto, any>({
        path: `/api/nftitems/search/image`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags nftitems
     * @name NftItemControllerGetDetailsById
     * @request GET:/api/nftitems/{itemId}/details
     */
    nftItemControllerGetDetailsById: (itemId: string, params: RequestParams = {}) =>
      this.request<NftItemDetailsRespDto, any>({
        path: `/api/nftitems/${itemId}/details`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags nftitems
     * @name NftItemControllerIncreaseView
     * @request POST:/api/nftitems/{itemId}/view
     */
    nftItemControllerIncreaseView: (itemId: string, params: RequestParams = {}) =>
      this.request<number, any>({
        path: `/api/nftitems/${itemId}/view`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags nftitems
     * @name NftItemControllerLike
     * @request POST:/api/nftitems/{itemId}/like
     * @secure
     */
    nftItemControllerLike: (itemId: string, params: RequestParams = {}) =>
      this.request<NftItem, any>({
        path: `/api/nftitems/${itemId}/like`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags nftitems
     * @name NftItemControllerUnlike
     * @request POST:/api/nftitems/{itemId}/unlike
     * @secure
     */
    nftItemControllerUnlike: (itemId: string, params: RequestParams = {}) =>
      this.request<NftItem, any>({
        path: `/api/nftitems/${itemId}/unlike`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags activities
     * @name ActivityLogControllerSearch
     * @request POST:/api/activities/search
     */
    activityLogControllerSearch: (data: ActivityLogFilterDto, params: RequestParams = {}) =>
      this.request<ActivityLogFilterDto, any>({
        path: `/api/activities/search`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
