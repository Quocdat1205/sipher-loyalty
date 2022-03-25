import {
  Burned,
  Canceled,
  ERC1155Lootbox,
  ERC1155LootboxAttribute,
  Lootbox,
  PendingMint,
} from "@entity";
import { CacheModule, Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CacheService } from "@modules/auth/cache.service";
import { BurnModule } from "@modules/burn/burn.module";
import { CancelModule } from "@modules/cancel/cancel.module";
import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { MintModule } from "@modules/mint/mint.module";
import { ClaimableLootbox } from "src/entity/claimableLootbox.entity";
import { TrackedBlock } from "src/entity/tracking.entity";

import { LootboxTrackerService } from "./lootbox-tracker.service";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      Lootbox,
      PendingMint,
      TrackedBlock,
      ClaimableLootbox,
      Burned,
      Canceled,
      ERC1155Lootbox,
      ERC1155LootboxAttribute,
    ]),
    MintModule,
    BurnModule,
    CancelModule,
    CacheModule,
  ],
  providers: [LootboxTrackerService, LootBoxService],
  exports: [LootboxTrackerService],
})
export class LootboxTrackerModule {}
