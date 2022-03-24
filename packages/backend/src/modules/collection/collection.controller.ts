import { catchError } from "rxjs";
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";
import { LoggerService } from "@modules/logger/logger.service";
import { CollectionCategory } from "src/entity/sipher-collection.entity";

import { PortfolioQuery } from "./collection.dto";
import { CollectionService } from "./collection.service";

@ApiTags("collection")
@Controller("collection")
export class CollectionController {
  constructor(
    private collectionService: CollectionService,
    private authService: AuthService
  ) {}

  @Get("")
  async getAllCollections() {
    return this.collectionService.getAllCollection();
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
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
    @Param("userAddress") userAddress: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(userAddress, req.userData);
    return this.collectionService.getPortfolio(
      userAddress.toLowerCase(),
      query
    );
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Get(":collectionSlug/portfolio/:userAddress")
  async getPortfolioByCollection(
    @Param("userAddress") userAddress: string,
    @Param("collectionSlug") collectionSlug: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(userAddress, req.userData);
    return this.collectionService.getPortfolioByCollection(
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
