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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";
import { LoggerService } from "@modules/logger/logger.service";
import { NftItem } from "@modules/nft/nft-item.dto";
import { CollectionCategory } from "src/entity/sipher-collection.entity";

import {
  PortfolioByCollectionResponse,
  PortfolioQuery,
} from "./collection.dto";
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
  @Get(":collectionId/portfolio/:userAddress")
  @ApiOkResponse({ type: PortfolioByCollectionResponse })
  async getPortfolioByCollection(
    @Param("userAddress") userAddress: string,
    @Param("collectionId") collectionId: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(userAddress, req.userData);
    return this.collectionService.getPortfolioByCollection(
      userAddress.toLowerCase(),
      collectionId.toLowerCase()
    );
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("portfolio/:userAddress/nft-item/:itemId")
  @ApiOkResponse({
    type: NftItem,
  })
  async getItemById(
    @Param("userAddress") userAddress: string,
    @Param("itemId") itemId: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(userAddress, req.userData);
    const result = await this.collectionService.getItemById(itemId);
    if (!result) {
      throw new HttpException("Item not found", 404);
    }
    return result;
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
