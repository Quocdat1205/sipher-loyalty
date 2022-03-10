import { Lootbox } from "@entity"
import { Body, Controller, Get, Param, Put } from "@nestjs/common"
import { ApiOkResponse, ApiTags } from "@nestjs/swagger"

// import { sessionType } from "../auth/auth.type"
import { LootBoxService } from "./lootbox.service"
import { MintBatchLootboxInputDto, MintLootboxInputDto } from "./lootbox.type"

@ApiTags("lootbox")
@Controller("lootbox")
export class LootBoxController {
  constructor(private lootBoxService: LootBoxService) {}

  @Get("get-by-walllet/:walletAddress")
  async getLootboxFromWallet(@Param("walletAddress") walletAddress: string) {
    return this.lootBoxService.getLootboxFromWallet(walletAddress)
  }

  @ApiOkResponse({ type: Lootbox })
  @Get("get-by-userid/:userid")
  async getLootboxFromUserID(@Param("userid") userid: string) {
    return this.lootBoxService.getLootboxFromUserID(userid)
  }

  @ApiOkResponse()
  @Put("mint-batch")
  async mintBatchLootbox(@Body() body: MintBatchLootboxInputDto) {
    return this.lootBoxService.mintBatchLootbox(body)
  }

  @ApiOkResponse()
  @Put("mint")
  async mintLootbox(@Body() body: MintLootboxInputDto) {
    return this.lootBoxService.mintLootbox(body)
  }
}
