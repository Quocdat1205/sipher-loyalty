import { Controller, Get, Session } from "@nestjs/common"
import { sessionType } from "../auth/auth.type"
import { LootBoxService } from "./lootbox.service"

@Controller("lootbox")
export class LootBoxController {
  constructor(private lootBoxService: LootBoxService) {}

  @Get("get-all")
  async getLootboxFromWallet(@Session() session: sessionType) {
    const { userId } = session
    return this.lootBoxService.getLootboxFromWallet(userId)
  }
}
