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

export type PendingMint = object;

export type Lootbox = object;

export type ClaimableLootbox = object;

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

export interface ClaimLootboxInputDto {
  publicAddress: string;
  tokenId: number;

  /** @format date-time */
  expiredDate: string;
}

export type Airdrop = object;

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
     * @tags mint
     * @name MintControllerGetPendingLootbox
     * @request GET:/api/sipher/loyalty/mint/pending/{publicAddress}
     * @secure
     */
    mintControllerGetPendingLootbox: (publicAddress: string, params: RequestParams = {}) =>
      this.request<PendingMint, any>({
        path: `/api/sipher/loyalty/mint/pending/${publicAddress}`,
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
      this.request<void, any>({
        path: `/api/sipher/loyalty/lootbox/get-by-walllet/${publicAddress}`,
        method: 'GET',
        secure: true,
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
      this.request<void, any>({
        path: `/api/sipher/loyalty/lootbox/get-by-walllet/claimable/${publicAddress}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerGetLootboxFromUserId
     * @request GET:/api/sipher/loyalty/lootbox/get-by-userID
     * @secure
     */
    lootBoxControllerGetLootboxFromUserId: (params: RequestParams = {}) =>
      this.request<Lootbox, any>({
        path: `/api/sipher/loyalty/lootbox/get-by-userID`,
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
     * @request GET:/api/sipher/loyalty/lootbox/get-by-userID/claimable
     * @secure
     */
    lootBoxControllerGetClaimableLootboxFromUserId: (params: RequestParams = {}) =>
      this.request<ClaimableLootbox, any>({
        path: `/api/sipher/loyalty/lootbox/get-by-userID/claimable`,
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
      this.request<void, any>({
        path: `/api/sipher/loyalty/lootbox/mint-batch`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
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
      this.request<void, any>({
        path: `/api/sipher/loyalty/lootbox/mint`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags lootbox
     * @name LootBoxControllerClaim
     * @request PUT:/api/sipher/loyalty/lootbox/claim/{tokenId}
     * @secure
     */
    lootBoxControllerClaim: (tokenId: string, data: ClaimLootboxInputDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/lootbox/claim/${tokenId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags uri
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
      this.request<Airdrop, any>({
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
     * @name MultiTokenControllerGetBalance
     * @request GET:/api/sipher/loyalty/erc1155/balance/{address}/{tokenId}
     */
    multiTokenControllerGetBalance: (address: string, tokenId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/sipher/loyalty/erc1155/balance/${address}/${tokenId}`,
        method: 'GET',
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
  };
}
