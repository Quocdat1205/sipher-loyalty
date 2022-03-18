// import library
import { Injectable } from "@nestjs/common";

import { LootBoxService } from "@modules/lootbox/lootbox.service";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedLootboxService {
  constructor(private lootboxService: LootBoxService) {}

  seedLootbox = async () => {
    LoggerService.log("start disribute claimable lootbox");
    await this.lootboxService.weeklySnapshotForClaimableLootbox();
    LoggerService.log("done disribute claimable lootbox");
  };
}
