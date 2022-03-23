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
import { NftItemService } from "@modules/nft/nftItem.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { LoggerService } from "@modules/logger/logger.service";

@Injectable()
export class CollectionService {
  constructor(
    private httpService: HttpService,
    private nftService: NftItemService,
    @InjectRepository(SipherCollection)
    private sipherCollectionRepo: Repository<SipherCollection>,
    private searchSrv: ElasticsearchService
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
