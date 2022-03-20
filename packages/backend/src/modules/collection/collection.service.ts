import _ from "lodash";
import { lastValueFrom, map, Observable } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CollectionType,
  SipherCollection,
} from "src/entity/sipher-collection.entity";
import { FindOneOptions, Repository } from "typeorm";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import { erc1155Abi, erc721Abi } from "@setting/blockchain/abis";
import { BigNumber } from "ethers";

@Injectable()
export class CollectionService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(SipherCollection)
    private sipherCollectionRepo: Repository<SipherCollection>
  ) {}

  private openseaApiBaseUrl = "https://api.opensea.io/api/v1";

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
    const collection = await this.getCollectionDetail(collectionSlug);
    const provider = getProvider(collection.chainId);
    const contract = getContract(
      collection.contractAddress,
      collection.collectionType === CollectionType.ERC721
        ? erc721Abi
        : erc1155Abi,
      provider
    );
    const balance = (
      (await contract.balanceOf(ownerAddress)) as BigNumber
    ).toNumber();
    let totalValue = 0;
    if (!collection.floorPrice) {
      const stats = await lastValueFrom(
        this.getCollectionStats(collectionSlug)
      );
      totalValue = stats.floorPrice * balance;
    } else {
      totalValue = collection.floorPrice * balance;
    }
    return {
      totalValue: totalValue.toFixed(4),
    };
  }
}
