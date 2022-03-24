import { catchError } from "rxjs";
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Query,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

import { LoggerService } from "@modules/logger/logger.service";

import { CollectionService } from "./collection.service";
import { PortfolioQuery } from "./collection.dto";
import { CollectionCategory } from "src/entity/sipher-collection.entity";

@ApiTags("collection")
@Controller("collection")
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Get("")
  async getAllCollections() {
    return await this.collectionService.getAllCollection();
  }

  @ApiQuery({
    name: "category",
    enum: CollectionCategory,
    required: false,
  })
  @ApiQuery({
    name: "chainId",
    required: false,
  })
  @Get("portfolio/:userAddress")
  async getUserCollection(
    @Query() query: PortfolioQuery,
    @Param("userAddress") userAddress: string
  ) {
    return await this.collectionService.getPortfolio(
      userAddress.toLowerCase(),
      query
    );
  }

  @Get(":collectionSlug/portfolio/:userAddress")
  async getPortfolioByCollection(
    @Param("userAddress") userAddress: string,
    @Param("collectionSlug") collectionSlug: string
  ) {
    return await this.collectionService.getPortfolioByCollection(
      userAddress.toLowerCase(),
      collectionSlug
    );
  }

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
}
