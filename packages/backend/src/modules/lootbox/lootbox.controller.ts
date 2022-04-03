import { Request } from "express";
import { ClaimableLootbox, Lootbox, PendingMint } from "@entity";
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
import { ParseEthereumAddress } from "src/pipes/ethereum-address..pipe";

import { LootBoxService } from "./lootbox.service";
import { MintBatchLootboxInputDto, MintLootboxInputDto } from "./lootbox.type";

@ApiTags("lootbox")
@Controller("lootbox")
export class LootBoxController {
  constructor(
    private lootBoxService: LootBoxService,
    private authService: AuthService
  ) {}

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: Lootbox })
  @Get("get-by-walllet/:publicAddress/:id")
  async getLootboxById(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Param("id") id: string,
    @Req() req: Request
  ) {
    await this.authService.verifyAddress(publicAddress, req);
    return this.lootBoxService.getLootboxById(id);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: Lootbox, isArray: true })
  @Get("get-by-walllet/:publicAddress")
  async getLootboxFromWallet(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Req() req: Request
  ) {
    const userData = await this.authService.verifyAddress(publicAddress, req);
    return this.lootBoxService.getLootboxFromWallet(
      userData.currentpublicAddress
    );
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: ClaimableLootbox, isArray: true })
  @Get("claimable/get-by-walllet/:publicAddress")
  async getClaimableLootboxFromWallet(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Req() req: Request
  ) {
    const userData = await this.authService.verifyAddress(publicAddress, req);
    return this.lootBoxService.getClaimableLootboxFromWallet(
      userData.currentpublicAddress
    );
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: Lootbox, isArray: true })
  @Get("get-by-userId")
  async getLootboxFromUserID(@Req() req: Request) {
    return this.lootBoxService.getLootboxFromUserID(req.userData);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: ClaimableLootbox, isArray: true })
  @Get("claimable/get-by-userId")
  async getClaimableLootboxFromUserID(@Req() req: Request) {
    return this.lootBoxService.getClaimableLootboxFromUserID(req.userData);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: PendingMint })
  @Put("mint-batch")
  async mintBatchLootbox(
    @Body() body: MintBatchLootboxInputDto,
    @Req() req: Request
  ) {
    await this.authService.verifyAddress(body.publicAddress, req);
    return this.lootBoxService.mintBatchLootbox(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: PendingMint })
  @Put("mint")
  async mintLootbox(@Body() body: MintLootboxInputDto, @Req() req: Request) {
    await this.authService.verifyAddress(body.publicAddress, req);
    return this.lootBoxService.mintLootbox(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: ClaimableLootbox, isArray: true })
  @Put("claim-lootbox/:publicAddress")
  async claim(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Req() req: Request
  ) {
    await this.authService.verifyAddress(publicAddress, req);
    return this.lootBoxService.claimLootbox(publicAddress);
  }
}
