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

import { LootBoxService } from "./lootbox.service";
import {
  MintBatchLootboxInputDto,
  MintLootboxInputDto,
  resMintBatchDto,
  resMintSingleDto,
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
  @ApiOkResponse({ type: Lootbox })
  @Get("get-by-walllet/:publicAddress/:id")
  async getLootboxById(
    @Param("publicAddress") publicAddress: string,
    @Param("id") id: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.lootBoxService.getLootboxById(id);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: Lootbox, isArray: true })
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
  @ApiOkResponse({ type: ClaimableLootbox, isArray: true })
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
  @ApiOkResponse({ type: Lootbox, isArray: true })
  @Get("get-by-userID")
  async getLootboxFromUserID(@Req() req: any) {
    return this.lootBoxService.getLootboxFromUserID(req.userData);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: ClaimableLootbox, isArray: true })
  @Get("get-by-userID/claimable")
  async getClaimableLootboxFromUserID(@Req() req: any) {
    return this.lootBoxService.getClaimableLootboxFromUserID(req.userData);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: PendingMint })
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
  @ApiOkResponse({ type: PendingMint })
  @Put("mint")
  async mintLootbox(@Body() body: MintLootboxInputDto, @Req() req: any) {
    await this.authService.verifyAddress(body.publicAddress, req.userData);
    return this.lootBoxService.mintLootbox(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: ClaimableLootbox, isArray: true })
  @Put("claim-lootbox/:publicAddress")
  async claim(@Param("publicAddress") publicAddress: string, @Req() req: any) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.lootBoxService.claimLootbox(publicAddress);
  }
}
