import { AxiosResponse } from "axios";
import * as rxjs from "rxjs";
import { Observable } from "rxjs";
import { Repository } from "typeorm";
import {
  CollectionCategory,
  CollectionType,
  ERC1155Lootbox,
  ERC1155Sculpture,
  SipherCollection,
} from "@entity";
import { HttpService } from "@nestjs/axios";
import {
  ElasticsearchModule,
  ElasticsearchService,
} from "@nestjs/elasticsearch";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { CollectionService } from "@modules/collection/collection.service";
import { TokenType } from "@modules/nft/nft.dto";
import { NftItemService } from "@modules/nft/nftItem.service";
import { URIService } from "@modules/uri/uri.service";
import * as utils from "@utils/utils";

import marketplaceClient from "../src/api/marketplaceClient";
import { NftItem, NftItemDetailsRespDto } from "../src/api/marketplaceSdk";

describe("Collection unit test", () => {
  let collectionService: CollectionService;
  let httpService: HttpService;
  let nftService: NftItemService;
  let sipherCollectionRepo: Repository<SipherCollection>;
  let uriService: URIService;
  let searchSrv: ElasticsearchService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ElasticsearchModule],
      providers: [
        HttpService,
        NftItemService,
        URIService,
        {
          provide: getRepositoryToken(SipherCollection),
          useClass: Repository,
        },
        CollectionService,
      ],
    })
      .overrideProvider(HttpService)
      .useValue({
        get: jest.fn(() => {}),
      })
      .overrideProvider(NftItemService)
      .useClass(NftItemService)
      .overrideProvider(URIService)
      .useValue({
        getDataERC1155Lootbox: jest.fn(() => {}),
        getDataERC1155Sculpture: jest.fn(() => {}),
      })
      .overrideProvider(ElasticsearchService)
      .useValue({
        get: jest.fn(() => {}),
      })
      .compile();
    collectionService = moduleRef.get<CollectionService>(CollectionService);
    httpService = moduleRef.get<HttpService>(HttpService);
    sipherCollectionRepo = moduleRef.get<Repository<SipherCollection>>(
      getRepositoryToken(SipherCollection)
    );
    nftService = moduleRef.get<NftItemService>(NftItemService);
    uriService = moduleRef.get<URIService>(URIService);
    searchSrv = moduleRef.get<ElasticsearchService>(ElasticsearchService);
  });

  describe("getAllCollection()", () => {
    const col = new SipherCollection();
    col.id = "1";
    it("should return collection array", async () => {
      jest
        .spyOn(sipherCollectionRepo, "find")
        .mockImplementation(async () => [col]);
      expect(await collectionService.getAllCollection()).toEqual([col]);
    });
  });

  describe("getCollectionStats()", () => {
    const openseaApiBaseUrl = "https://api.opensea.io/api/v1";
    const openseaApiTestBaseUrl = "https://testnets-api.opensea.io/api/v1/";
    it("should call os mainnet", async () => {
      const httpGetMock = jest
        .spyOn(httpService, "get")
        .mockImplementation(() => new Observable());
      collectionService.getCollectionStats("x");
      expect(httpGetMock).toHaveBeenCalledWith(
        `${openseaApiBaseUrl}/collection/x/stats`,
        { headers: { Accept: "application/json" } }
      );
    });
    it("should call os testnet", async () => {
      const httpGetMock = jest
        .spyOn(httpService, "get")
        .mockImplementation(() => new Observable());
      collectionService.getCollectionStats("x", false);
      expect(httpGetMock).toHaveBeenCalledWith(
        `${openseaApiTestBaseUrl}/collection/x/stats`,
        { headers: { Accept: "application/json" } }
      );
    });
  });

  const mainnetId = 1;
  const polygonId = 137;
  const characterCol = new SipherCollection();
  characterCol.id = "1";
  characterCol.category = CollectionCategory.CHARACTER;
  characterCol.createdAt = new Date(1);
  characterCol.collectionType = CollectionType.ERC721;
  characterCol.chainId = mainnetId;

  const lootboxCol = new SipherCollection();
  lootboxCol.id = "2";
  lootboxCol.category = CollectionCategory.LOOTBOX;
  lootboxCol.createdAt = new Date(2);
  lootboxCol.collectionType = CollectionType.ERC1155;
  lootboxCol.chainId = polygonId;

  const sculptureCol = new SipherCollection();
  sculptureCol.id = "3";
  sculptureCol.category = CollectionCategory.SCULPTURE;
  sculptureCol.createdAt = new Date(3);
  sculptureCol.collectionType = CollectionType.ERC1155;
  sculptureCol.chainId = polygonId;

  const creator = "0x";
  const item1 = {
    id: "1",
    tokenId: "1",
    collectionId: characterCol.id,
    owner: "0x1",
    creator,
    value: 1,
    type: TokenType.ERC721,
  };
  const item2 = {
    id: "2:0x2:1",
    tokenId: "1:2",
    collectionId: lootboxCol.id,
    value: 5,
    owner: "0x2",
    creator,
    type: TokenType.ERC1155,
  };
  const item3 = {
    id: "3:0x3:1",
    tokenId: "3:1",
    collectionId: sculptureCol.id,
    value: 2,
    owner: "0x3",
    creator,
    type: TokenType.ERC1155,
  };
  describe("getPortfolio()", () => {
    beforeEach(() => {
      jest
        .spyOn(nftService, "search")
        .mockImplementation(async () => [item1, item2, item3]);
      jest
        .spyOn(collectionService, "getAllCollection")
        .mockImplementation(async () => [
          characterCol,
          lootboxCol,
          sculptureCol,
        ]);
    });
    it("should return full array of collections", async () => {
      expect(await collectionService.getPortfolio("0x", {})).toEqual([
        { ...characterCol, total: 1 },
        { ...lootboxCol, total: item2.value },
        { ...sculptureCol, total: item3.value },
      ]);
    });
    it("should return character collection only", async () => {
      expect(
        await collectionService.getPortfolio("0x", {
          category: CollectionCategory.CHARACTER,
        })
      ).toEqual([{ ...characterCol, total: 1 }]);
    });
    it("should return lootbox collection only", async () => {
      expect(
        await collectionService.getPortfolio("0x", {
          category: CollectionCategory.LOOTBOX,
        })
      ).toEqual([{ ...lootboxCol, total: item2.value }]);
    });
    it("should return sculpture collection only", async () => {
      expect(
        await collectionService.getPortfolio("0x", {
          category: CollectionCategory.SCULPTURE,
        })
      ).toEqual([{ ...sculptureCol, total: item3.value }]);
    });
    it("should return correct collection with chainId query", async () => {
      expect(
        await collectionService.getPortfolio("0x", {
          chainId: mainnetId.toString(),
        })
      ).toEqual([{ ...characterCol, total: 1 }]);
      expect(
        await collectionService.getPortfolio("0x", {
          chainId: polygonId.toString(),
        })
      ).toEqual([
        { ...lootboxCol, total: item2.value },
        { ...sculptureCol, total: item3.value },
      ]);
    });
  });

  describe("getPortfolioByCollection()", () => {
    // beforeEach(() => {
    //   jest.mock("@utils/utils", () => ({
    //     isLootboxContract: () => true,
    //   }));
    // });
    it("should return empty collection portfolio when collection is not found", async () => {
      jest
        .spyOn(sipherCollectionRepo, "findOne")
        .mockImplementation(async () => undefined);
      expect(
        await collectionService.getPortfolioByCollection({
          collectionId: "0x",
          userAddress: "0x",
        })
      ).toEqual({
        collection: {},
        items: [],
        total: 0,
      });
    });
    it("should return character collection and its items", async () => {
      jest
        .spyOn(sipherCollectionRepo, "findOne")
        .mockImplementation(async () => characterCol);
      jest.spyOn(nftService, "search").mockImplementation(async () => [item1]);
      jest.spyOn(nftService, "count").mockImplementation(async () => 1);
      jest.spyOn(utils, "isLootboxContract").mockReturnValue(false);
      jest.spyOn(utils, "isSculptureContract").mockReturnValue(false);
      expect(
        await collectionService.getPortfolioByCollection({
          collectionId: "0x",
          userAddress: "0x",
          from: 0,
          size: 20,
        })
      ).toEqual({
        collection: characterCol,
        items: [item1],
        total: 1,
      });
    });
    it("should return lootbox collection and its items", async () => {
      jest
        .spyOn(sipherCollectionRepo, "findOne")
        .mockResolvedValueOnce(lootboxCol);
      jest.spyOn(nftService, "search").mockResolvedValueOnce([item2]);
      jest.spyOn(nftService, "count").mockResolvedValueOnce(1);
      jest.spyOn(utils, "isLootboxContract").mockReturnValueOnce(true);
      const uri = new ERC1155Lootbox();
      uri.name = "yeet";
      uri.image = "yeeeeeet";
      jest
        .spyOn(uriService, "getDataERC1155Lootbox")
        .mockResolvedValueOnce(uri);
      jest.spyOn(utils, "isSculptureContract").mockReturnValueOnce(false);
      expect(
        await collectionService.getPortfolioByCollection({
          collectionId: "0x",
          userAddress: "0x",
          from: 0,
          size: 20,
        })
      ).toEqual({
        collection: lootboxCol,
        items: [
          {
            ...item2,
            tokenId: utils.toTokenId(item2.tokenId),
            name: uri.name,
            imageUrl: uri.image,
            type: TokenType.ERC1155,
          },
        ],
        total: item2.value,
      });
    });
    it("should return sculpture collection and its items", async () => {
      jest
        .spyOn(sipherCollectionRepo, "findOne")
        .mockResolvedValueOnce(sculptureCol);
      jest.spyOn(nftService, "search").mockResolvedValueOnce([item3]);
      jest.spyOn(nftService, "count").mockResolvedValueOnce(1);
      jest.spyOn(utils, "isLootboxContract").mockReturnValueOnce(false);
      jest.spyOn(utils, "isSculptureContract").mockReturnValueOnce(true);
      const uri = new ERC1155Sculpture();
      uri.name = "yeet";
      uri.image = "yeeeeeet";
      jest
        .spyOn(uriService, "getDataERC1155Sculpture")
        .mockResolvedValueOnce(uri);
      expect(
        await collectionService.getPortfolioByCollection({
          collectionId: "0x",
          userAddress: "0x",
          from: 0,
          size: 20,
        })
      ).toEqual({
        collection: sculptureCol,
        items: [
          {
            ...item3,
            name: uri.name,
            tokenId: utils.toTokenId(item3.tokenId),
            imageUrl: uri.image,
            type: TokenType.ERC1155,
          },
        ],
        total: item3.value,
      });
    });
  });

  describe("getItemById()", () => {
    it("should throw error", async () => {
      jest
        .spyOn(marketplaceClient.api, "nftItemControllerGetDetailsById")
        .mockImplementation(() => {
          throw new Error();
        });
      await expect(
        collectionService.getItemById(item1.id, "xx")
      ).rejects.toThrow();
    });
    it("should return erc721 item1", async () => {
      const socialInfo1 = {
        avatarImage: "yeet",
        name: "yeeter",
      };
      const attachedInfo = {
        profileImage: "yeet",
        publicAddress: item1.owner,
        username: "yeeter",
      };
      jest
        .spyOn(marketplaceClient.api, "nftItemControllerGetDetailsById")
        .mockResolvedValueOnce({
          data: {
            item: item1 as any,
            attributes: [],
          },
        } as AxiosResponse<NftItemDetailsRespDto, any>);
      jest
        .spyOn(sipherCollectionRepo, "findOne")
        .mockResolvedValue(characterCol);
      jest.spyOn(httpService, "get").mockReturnValueOnce(new Observable());
      jest.spyOn(rxjs, "lastValueFrom").mockResolvedValue({
        data: [socialInfo1],
      });
      expect(await collectionService.getItemById(item1.id, "xx")).toEqual({
        ...item1,
        attributes: [],
        collection: characterCol,
        ownerInfo: attachedInfo,
        creatorInfo: { ...attachedInfo, publicAddress: creator },
      });
    });
    it("should return lootbox item2", async () => {
      const socialInfo1 = {
        address: item2.owner,
        avatarImage: "yeet",
        name: "yeeter",
      };
      const attachedInfo = {
        profileImage: "yeet",
        publicAddress: item2.owner,
        username: "yeeter",
      };
      jest.spyOn(searchSrv, "get").mockReturnValueOnce({
        body: {
          _source: item2,
        },
      } as any);
      jest.spyOn(nftService, "search").mockResolvedValueOnce([item2]);
      jest.spyOn(sipherCollectionRepo, "findOne").mockResolvedValue(lootboxCol);
      jest.spyOn(httpService, "get").mockReturnValueOnce(new Observable());
      jest.spyOn(rxjs, "lastValueFrom").mockResolvedValue({
        data: [socialInfo1],
      });
      expect(await collectionService.getItemById(item2.id, "xx")).toEqual({
        ...item2,
        tokenId: item2.tokenId,
        collection: lootboxCol,
        allOwner: [{ ...attachedInfo, totalOwned: item2.value }],
        creatorInfo: { ...attachedInfo, publicAddress: creator },
      });
    });
  });
});
