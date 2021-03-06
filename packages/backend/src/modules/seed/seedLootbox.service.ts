// import library
import fs from "fs";
import path from "path";

import { Repository } from "typeorm";
import { ClaimableLootbox, ERC1155Lootbox } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";

import { LootBoxService } from "@modules/lootbox/lootbox.service";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedLootboxService {
  private src = path.resolve(
    __dirname,
    `../../../src/data/DISTRIBUTE/LOOTBOX/data${
      constant.isProduction ? "" : "_test"
    }.json`
  );

  private lootboxData = JSON.parse(fs.readFileSync(this.src).toString());

  constructor(
    private lootboxService: LootBoxService,
    @InjectRepository(ERC1155Lootbox)
    private erc1155LootboxRepo: Repository<ERC1155Lootbox>,
    @InjectRepository(ClaimableLootbox)
    private claimableLootboxRepo: Repository<ClaimableLootbox>
  ) {}

  private async createClaimableLootbox(lootbox: any) {
    const erclootbox = await this.erc1155LootboxRepo.findOne({
      tokenId: lootbox.tokenId,
    });

    await this.lootboxService.addQuantityClaimedLootbox({
      publicAddress: lootbox.publicAddress.toLowerCase(),
      tokenId: lootbox.tokenId,
      quantity: lootbox.quantity,
      expiredDate: lootbox.expiredDate,
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
    LoggerService.log("Done add lootbox test");
  };
}
