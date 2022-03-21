// import library
import fs from "fs";

import { Injectable } from "@nestjs/common";

import { LootBoxService } from "@modules/lootbox/lootbox.service";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedLootboxService {
  private lootboxData = JSON.parse(
    fs.readFileSync("./src/data/LOOTBOX/data.json").toString()
  );

  constructor(private lootboxService: LootBoxService) {}

  seedLootboxWeekly = async () => {
    LoggerService.log("start disribute claimable lootbox");
    await this.lootboxService.weeklySnapshotForClaimableLootbox();
    LoggerService.log("done disribute claimable lootbox");
  };

  seedLootboxCustom = async () => {
    const flaternLootbox = this.lootboxData.data.map((el) => ({
      expiredDate: this.lootboxData.expiredDate,
      ...el,
    }));

    const promises = [];
    const expiredDate = new Date().getTime();
    for (let i = 0; i < flaternLootbox.length; i++) {
      // LoggerService.log(query);
      promises.push(
        this.lootboxService.upsertClaimedLootbox({
          publicAddress: flaternLootbox[i].publicAddress,
          tokenId: flaternLootbox[i].tokenId,
          quantity: flaternLootbox[i].quantity,
          expiredDate: new Date(expiredDate),
        })
      );
    }
    await Promise.all(promises);
  };
}
