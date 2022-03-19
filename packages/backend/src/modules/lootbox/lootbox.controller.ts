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
  @Get("get-by-walllet/:walletAddress")
  async getLootboxFromWallet(
    @Param("walletAddress") walletAddress: string,
    @Req() req: any
  ) {
    const userData = await this.authService.verifyAddress(
      walletAddress,
      req.userData
    );
    return this.lootBoxService.getLootboxFromWallet(
      userData.currentWalletAddress
    );
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("get-by-walllet/claimable/:walletAddress")
  async getClaimableLootboxFromWallet(
    @Param("walletAddress") walletAddress: string,
    @Req() req: any
  ) {
    const userData = await this.authService.verifyAddress(
      walletAddress,
      req.userData
    );
    return this.lootBoxService.getClaimableLootboxFromWallet(
      userData.currentWalletAddress
    );
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: Lootbox })
  @Get("get-by-userid")
  async getLootboxFromUserID(@Req() req: any) {
    return this.lootBoxService.getLootboxFromUserID(req.userData);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: ClaimableLootbox })
  @Get("get-by-userid/claimable")
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
    await this.authService.verifyAddress(body.walletAddress, req.userData);
    return this.lootBoxService.mintBatchLootbox(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse()
  @Put("mint")
  async mintLootbox(@Body() body: MintLootboxInputDto, @Req() req: any) {
    await this.authService.verifyAddress(body.walletAddress, req.userData);
    return this.lootBoxService.mintLootbox(body);
  }
}
