import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { Injectable } from "@nestjs/common";
import { catchError, map, Observable } from "rxjs";
import { LoggerService } from "@modules/logger/logger.service";
import _ from "lodash";

@Injectable()
export class CollectionService {
  constructor(private httpService: HttpService) {}

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
        let camelCaseStats = {};
        Object.entries(res.data.stats).map((entry) => {
          camelCaseStats[_.camelCase(entry[0])] = entry[1];
        });
        return camelCaseStats;
      })
    );
  }
}
