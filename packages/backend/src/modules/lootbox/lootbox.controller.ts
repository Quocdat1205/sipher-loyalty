import { Lootbox } from "@entity";
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";
import { ClaimableLootbox } from "src/entity/claimableLootbox.entity";

import { LootBoxService } from "./lootbox.service";
import {
  ClaimLootboxInputDto,
  MintBatchLootboxInputDto,
  MintLootboxInputDto,
} from "./lootbox.type";

@ApiTags("lootbox")
@Controller("lootbox")
export class LootBoxController {
  constructor(
    private lootBoxService: LootBoxService,
    private authService: AuthService
  ) {}

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("get-by-walllet/:publicAddress")
  async getLootboxFromWallet(
    @Param("publicAddress") publicAddress: string,
    @Req() req: any
  ) {
    const userData = await this.authService.verifyAddress(
      publicAddress,
      req.userData
    );
    return this.lootBoxService.getLootboxFromWallet(
      userData.currentpublicAddress
    );
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("get-by-walllet/claimable/:publicAddress")
  async getClaimableLootboxFromWallet(
    @Param("publicAddress") publicAddress: string,
    @Req() req: any
  ) {
    const userData = await this.authService.verifyAddress(
      publicAddress,
      req.userData
    );
    return this.lootBoxService.getClaimableLootboxFromWallet(
      userData.currentpublicAddress
    );
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: Lootbox })
  @Get("get-by-userID")
  async getLootboxFromUserID(@Req() req: any) {
    return this.lootBoxService.getLootboxFromUserID(req.userData);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: ClaimableLootbox })
  @Get("get-by-userID/claimable")
  async getClaimableLootboxFromUserID(@Req() req: any) {
    return this.lootBoxService.getClaimableLootboxFromUserID(req.userData);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse()
  @Put("mint-batch")
  async mintBatchLootbox(
    @Body() body: MintBatchLootboxInputDto,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(body.publicAddress, req.userData);
    return this.lootBoxService.mintBatchLootbox(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse()
  @Put("mint")
  async mintLootbox(@Body() body: MintLootboxInputDto, @Req() req: any) {
    await this.authService.verifyAddress(body.publicAddress, req.userData);
    return this.lootBoxService.mintLootbox(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse()
  @Put("claim/:tokenID")
  async claim(@Body() body: ClaimLootboxInputDto, @Req() req: any) {
    await this.authService.verifyAddress(body.publicAddress, req.userData);
    return this.lootBoxService.claimLootbox(body);
  }
}
