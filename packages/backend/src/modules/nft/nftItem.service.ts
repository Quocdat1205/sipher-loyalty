import { omit } from 'lodash';
import { Injectable } from '@nestjs/common';
import { NftItem } from './nft.dto';
import {
  NftItemAttributeFilterDto,
  NftItemFilterDto,
  NftItemFilterOrderBy,
} from './nft-item.dto';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class NftItemService {
  constructor(private readonly searchSrv: ElasticsearchService) {}

  async search(options?: NftItemFilterDto) {
    const {
      owner,
      collections,
      listingTypes,
      rarities,
      priceFrom,
      priceTo,
      attributes,
      orderBy,
    } = options;
    const take = 20;
    const from = 0;

    const filter: any[] = [{ term: { _entity: NftItem.name } }];
    const sort = [];
    const query: Record<string, any> = {
      bool: { filter },
    };

    try {
      if (owner) {
        filter.push({ term: { owner } });
      }
      if (Array.isArray(collections)) {
        filter.push({ terms: { collectionId: collections } });
      }
      if (Array.isArray(listingTypes)) {
        console.log('filter by listingTypes is not implemented yet');
      }
      if (Array.isArray(rarities)) {
        console.log('filter by rarities is not implemented yet');
      }
      if (priceFrom || priceTo) {
        console.log('filter by price is not implemented yet');
      }
      if (Array.isArray(attributes)) {
        filter.push(this.buildAttributeSearchOptions(attributes));
      }
      if (orderBy) {
        switch (orderBy) {
          case NftItemFilterOrderBy.MostViewed:
            sort.push({ viewCount: { order: 'desc' } });
            break;
          case NftItemFilterOrderBy.MostFavorited:
            sort.push({ likeCount: { order: 'desc' } });
            break;
          case NftItemFilterOrderBy.RarityAsc:
            sort.push({ rarityRank: { order: 'asc' } });
            break;
          case NftItemFilterOrderBy.RarityDesc:
            sort.push({ rarityRank: { order: 'desc' } });
            break;
          default:
            console.log(`order by ${orderBy} is not implemented yet`);
            break;
        }
      }

      const res = await this.searchSrv.search({
        index: process.env.ELASTICSEARCH_INDEX,
        body: { from, size: take, query, sort },
      });

      return (
        res.body.hits?.hits?.map((item: { _source: any }) =>
          omit(item._source, ['_entity']),
        ) ?? []
      );
    } catch (error) {
      console.log(error);
    }
  }

  private buildAttributeSearchOptions = (
    attributes: NftItemAttributeFilterDto[],
  ) => {
    const options = attributes.map((attribute) => ({
      bool: {
        must: [
          {
            term: {
              'attributes.trait_type': {
                value: attribute.traitType,
              },
            },
          },
          {
            terms: {
              'attributes.value': attribute.values,
            },
          },
        ],
      },
    }));

    return {
      nested: {
        path: 'attributes',
        query: {
          bool: {
            should: options,
          },
        },
      },
    };
  };
}
