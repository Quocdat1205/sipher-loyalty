// import library
import { Injectable } from "@nestjs/common";

import { LootBoxService } from "@modules/lootbox/lootbox.service";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedLootboxService {
  constructor(private lootboxService: LootBoxService) {}

  seedLootbox = async () => {
    LoggerService.log("start disribute lootbox");
    await this.lootboxService.distributeLootboxWeeklyForHolder();
    LoggerService.log("done disribute lootbox");
  };
}
