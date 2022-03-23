// import library
import fs from "fs";

import { Repository } from "typeorm";
import { ClaimableLootbox, ERC1155Lootbox } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LootBoxService } from "@modules/lootbox/lootbox.service";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedLootboxService {
  private lootboxData = JSON.parse(
    fs.readFileSync("./src/data/LOOTBOX/data.json").toString()
  );

  constructor(
    private lootboxService: LootBoxService,
    @InjectRepository(ERC1155Lootbox)
    private erc1155LootboxRepo: Repository<ERC1155Lootbox>,
    @InjectRepository(ClaimableLootbox)
    private claimableLootboxRepo: Repository<ClaimableLootbox>
  ) {}

  seedLootboxWeekly = async () => {
    LoggerService.log("start disribute claimable lootbox");
    await this.lootboxService.weeklySnapshotForClaimableLootbox();
    LoggerService.log("done disribute claimable lootbox");
  };

  private async createClaimableLootbox(lootbox: any) {
    const erclootbox = await this.erc1155LootboxRepo.findOne({
      tokenId: lootbox.tokenId,
    });
    this.lootboxService.addQuantityClaimedLootbox({
      publicAddress: lootbox.publicAddress,
      tokenId: lootbox.tokenId,
      quantity: lootbox.quantity,
      expiredDate: new Date(lootbox.expiredDate),
      propertyLootbox: erclootbox,
    });
  }

  seedLootboxCustom = async () => {
    await this.claimableLootboxRepo.query(`delete from claimable_lootbox `);
    const promises = [];

    for (let i = 0; i < this.lootboxData.length; i++) {
      promises.push(this.createClaimableLootbox(this.lootboxData[i]));
    }
    await Promise.all(promises);
  };
}
