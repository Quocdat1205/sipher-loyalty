import { catchError } from "rxjs";
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { LoggerService } from "@modules/logger/logger.service";

import { CollectionService } from "./collection.service";

@ApiTags("collection")
@Controller("collection")
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Get(":collectionSlug/stats")
  getCollectionStat(@Param("collectionSlug") collectionSlug: string) {
    return this.collectionService.getCollectionStats(collectionSlug).pipe(
      catchError((err) => {
        LoggerService.error(err);
        if (err.response.status === 404) {
          throw new HttpException("Collection not found", HttpStatus.NOT_FOUND);
        }
        throw new InternalServerErrorException();
      })
    );
  }

  @Get(":collectionSlug/portfolio/:ownerAddress")
  async getCollectionPorfolio(
    @Param("collectionSlug") collectionSlug: string,
    @Param("ownerAddress") ownerAddress: string
  ) {
    return await this.collectionService.getCollectionPortfolio(
      collectionSlug,
      ownerAddress.toLowerCase()
    );
  }
}
