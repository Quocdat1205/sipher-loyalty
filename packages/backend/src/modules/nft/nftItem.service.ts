import { omit } from "lodash";
import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import constant from "@setting/constant";

import { LoggerService } from "../logger/logger.service";

import { NftItem } from "./nft.dto";
import {
  NftItemAttributeFilterDto,
  NftItemFilterDto,
  NftItemFilterOrderBy,
} from "./nft-item.dto";

@Injectable()
export class NftItemService {
  constructor(private readonly searchSrv: ElasticsearchService) {}

  async search(options?: NftItemFilterDto, from = 0, limit = 20) {
    const {
      owner,
      collections,
      listingTypes,
      rarities,
      priceFrom,
      priceTo,
      attributes,
      orderBy,
      tokenId,
    } = options;
    const take = limit;

    const filter: any[] = [{ term: { _entity: NftItem.name } }];
    const sort = [];
    const query: Record<string, any> = {
      bool: { filter },
    };

    try {
      if (owner) {
        filter.push({ term: { owner } });
      }
      if (tokenId) {
        filter.push({ term: { tokenId } });
      }
      if (Array.isArray(collections)) {
        filter.push({ terms: { collectionId: collections } });
      }
      if (Array.isArray(listingTypes)) {
        LoggerService.log("filter by listingTypes is not implemented yet");
      }
      if (Array.isArray(rarities)) {
        LoggerService.log("filter by rarities is not implemented yet");
      }
      if (priceFrom || priceTo) {
        LoggerService.log("filter by price is not implemented yet");
      }
      if (Array.isArray(attributes)) {
        filter.push(this.buildAttributeSearchOptions(attributes));
      }
      if (orderBy) {
        switch (orderBy) {
          case NftItemFilterOrderBy.MostViewed:
            sort.push({ viewCount: { order: "desc" } });
            break;
          case NftItemFilterOrderBy.MostFavorited:
            sort.push({ likeCount: { order: "desc" } });
            break;
          case NftItemFilterOrderBy.RarityAsc:
            sort.push({ rarityRank: { order: "asc" } });
            break;
          case NftItemFilterOrderBy.RarityDesc:
            sort.push({ rarityRank: { order: "desc" } });
            break;
          default:
            LoggerService.log(`order by ${orderBy} is not implemented yet`);
            break;
        }
      }

      const res = await this.searchSrv.search({
        index: constant.ELASTICSEARCH_INDEX,
        body: { from, size: take, query, sort },
      });
      return (
        res.body.hits?.hits?.map((item: { _source: any }) =>
          omit(item._source, ["_entity"])
        ) ?? []
      );
    } catch (error) {
      LoggerService.log(error);
    }
  }

  private buildAttributeSearchOptions = (
    attributes: NftItemAttributeFilterDto[]
  ) => {
    const options = attributes.map((attribute) => ({
      bool: {
        must: [
          {
            term: {
              "attributes.trait_type": {
                value: attribute.traitType,
              },
            },
          },
          {
            terms: {
              "attributes.value": attribute.values,
            },
          },
        ],
      },
    }));

    return {
      nested: {
        path: "attributes",
        query: {
          bool: {
            should: options,
          },
        },
      },
    };
  };
}
