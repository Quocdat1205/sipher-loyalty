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
import { ClaimableLootbox } from "src/entity/claimableLootbox.entity";

// import { sessionType } from "../auth/auth.type"
import { LootBoxService } from "./lootbox.service";
import { MintBatchLootboxInputDto, MintLootboxInputDto } from "./lootbox.type";

@ApiTags("lootbox")
@Controller("lootbox")
export class LootBoxController {
  constructor(private lootBoxService: LootBoxService) {}

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("get-by-walllet/:walletAddress")
  async getLootboxFromWallet(
    @Param("walletAddress") walletAddress: string,
    @Req() req: any
  ) {
    console.log(req.userData);
    return this.lootBoxService.getLootboxFromWallet(walletAddress);
  }

  @Get("get-by-walllet/claimable/:walletAddress")
  async getClaimableLootboxFromWallet(
    @Param("walletAddress") walletAddress: string
  ) {
    return this.lootBoxService.getClaimableLootboxFromWallet(walletAddress);
  }

  @ApiOkResponse({ type: Lootbox })
  @Get("get-by-userid/:userid")
  async getLootboxFromUserID(@Param("userid") userid: string) {
    return this.lootBoxService.getLootboxFromUserID(userid);
  }

  @ApiOkResponse({ type: ClaimableLootbox })
  @Get("get-by-userid/:userid")
  async getClaimableLootboxFromUserID(@Param("userid") userid: string) {
    return this.lootBoxService.getClaimableLootboxFromUserID(userid);
  }

  @ApiOkResponse()
  @Put("mint-batch")
  async mintBatchLootbox(@Body() body: MintBatchLootboxInputDto) {
    return this.lootBoxService.mintBatchLootbox(body);
  }

  @ApiOkResponse()
  @Put("mint")
  async mintLootbox(@Body() body: MintLootboxInputDto) {
    return this.lootBoxService.mintLootbox(body);
  }
}
