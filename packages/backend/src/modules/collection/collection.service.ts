import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { Injectable } from "@nestjs/common";
import { catchError, map, Observable } from "rxjs";
import { LoggerService } from "@modules/logger/logger.service";

@Injectable()
export class CollectionService {
  constructor(private httpService: HttpService) {}

  private openseaApiBaseUrl = "https://api.opensea.io/api/v1";
  getCollectionStats(collectionSlug: string) {
    const data = this.httpService.get(
      `${this.openseaApiBaseUrl}/collection/${collectionSlug}/stats`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data.pipe(map((res) => res.data.stats));
  }
}
