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

export type SignWalletDto = object;

export type ConnectDiscordDto = object;

export type UpdateAccountDto = object;

export type LogInDto = object;

export type Lootbox = object;

export type ClaimableLootbox = object;

export interface MintBatchLootboxInputDto {
  walletAddress: string;
  batchID: number[];
  amount: number[];
}

export interface MintLootboxInputDto {
  walletAddress: string;
  batchID: number;
  amount: number;
}

export type SculptureBalanceDto = object;

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
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
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
      requestParams.headers.common = { Accept: '*/*' };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

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
     * @name UserControllerCheckExpireToken
     * @request GET:/api/sipher/loyalty/user/check-expired
     */
    userControllerCheckExpireToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/check-expired`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetNonce
     * @request GET:/api/sipher/loyalty/user/get-nonce
     */
    userControllerGetNonce: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/get-nonce`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerSignWallet
     * @request POST:/api/sipher/loyalty/user/sign
     */
    userControllerSignWallet: (data: SignWalletDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/sign`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetInfo
     * @request GET:/api/sipher/loyalty/user/get-info
     */
    userControllerGetInfo: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/get-info`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerConnectDiscord
     * @request POST:/api/sipher/loyalty/user/connect-discord
     */
    userControllerConnectDiscord: (data: ConnectDiscordDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/connect-discord`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerUpdateAccount
     * @request POST:/api/sipher/loyalty/user/update-account
     */
    userControllerUpdateAccount: (data: UpdateAccountDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/update-account`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetActiviti
     * @request GET:/api/sipher/loyalty/user/get-activity
     */
    userControllerGetActiviti: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/get-activity`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetTransaction
     * @request GET:/api/sipher/loyalty/user/get-transaction
     */
    userControllerGetTransaction: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/user/get-transaction`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name NftItemControllerGetAllNft
     * @request GET:/api/sipher/loyalty/nft/get-all
     */
    nftItemControllerGetAllNft: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/nft/get-all`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name AdminControllerLogIn
     * @request POST:/api/sipher/loyalty/admin/log-in
     */
    adminControllerLogIn: (data: LogInDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/admin/log-in`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name AdminControllerCheckExpireToken
     * @request GET:/api/sipher/loyalty/admin/check-expire
     */
    adminControllerCheckExpireToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/admin/check-expire`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name MintControllerGetPendingLootbox
     * @request GET:/api/sipher/loyalty/mint/pending/{walletAddress}
     */
    mintControllerGetPendingLootbox: (walletAddress: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/mint/pending/${walletAddress}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerGetLootboxFromWallet
     * @request GET:/api/sipher/loyalty/lootbox/get-by-walllet/{walletAddress}
     */
    lootBoxControllerGetLootboxFromWallet: (walletAddress: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/lootbox/get-by-walllet/${walletAddress}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerGetClaimableLootboxFromWallet
     * @request GET:/api/sipher/loyalty/lootbox/get-by-walllet/claimable/{walletAddress}
     */
    lootBoxControllerGetClaimableLootboxFromWallet: (
      walletAddress: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/lootbox/get-by-walllet/claimable/${walletAddress}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerGetClaimableLootboxFromUserId
     * @request GET:/api/sipher/loyalty/lootbox/get-by-userid/{userid}
     */
    lootBoxControllerGetClaimableLootboxFromUserId: (userid: string, params: RequestParams = {}) =>
      this.request<ClaimableLootbox, any>({
        path: `/api/sipher/loyalty/lootbox/get-by-userid/${userid}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerMintBatchLootbox
     * @request PUT:/api/sipher/loyalty/lootbox/mint-batch
     */
    lootBoxControllerMintBatchLootbox: (
      data: MintBatchLootboxInputDto,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/lootbox/mint-batch`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerMintLootbox
     * @request PUT:/api/sipher/loyalty/lootbox/mint
     */
    lootBoxControllerMintLootbox: (data: MintLootboxInputDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/lootbox/mint`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name UriControllerGetDataErc1155Spaceship
     * @request GET:/api/sipher/loyalty/uri/erc1155-spaceship/{tokenId}
     */
    uriControllerGetDataErc1155Spaceship: (tokenId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/uri/erc1155-spaceship/${tokenId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
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
     * @name AirdropControllerGetAirdrop
     * @request GET:/api/sipher/loyalty/airdrop/{publicAddress}/{campaignCode}
     */
    airdropControllerGetAirdrop: (
      publicAddress: string,
      campaignCode: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/airdrop/${publicAddress}/${campaignCode}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name MultiTokenControllerGetBalance
     * @request GET:/api/sipher/loyalty/erc1155/balance/{address}/{tokenId}
     */
    multiTokenControllerGetBalance: (
      address: string,
      tokenId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/erc1155/balance/${address}/${tokenId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @name SculptureControllerClaimShopifyCode
     * @request POST:/api/sipher/loyalty/sculpture/claim-code
     */
    sculptureControllerClaimShopifyCode: (data: SculptureBalanceDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/sculpture/claim-code`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
