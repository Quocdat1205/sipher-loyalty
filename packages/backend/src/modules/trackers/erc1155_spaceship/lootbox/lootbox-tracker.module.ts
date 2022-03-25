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

import { AuthModule } from "@modules/auth/auth.module";
import { BurnModule } from "@modules/burn/burn.module";
import { CacheService } from "@modules/cache/cache.service";
import { CancelModule } from "@modules/cancel/cancel.module";
import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { MintModule } from "@modules/mint/mint.module";
import { ClaimableLootbox } from "src/entity/claimableLootbox.entity";
import { TrackedBlock } from "src/entity/tracking.entity";

import { LootboxTrackerBurnedService } from "./lootbox-tracker-burned.service";
import { LootboxTrackerCancelService } from "./lootbox-tracker-canceled.service";
import { LootboxTrackerExpiredService } from "./lootbox-tracker-expired.service";
import { LootboxTrackerMintedService } from "./lootbox-tracker-minted.service";

@Module({
  imports: [
    CacheModule.register(),
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
    AuthModule,
  ],
  providers: [
    LootboxTrackerBurnedService,
    LootboxTrackerCancelService,
    LootboxTrackerMintedService,
    LootBoxService,
    CacheService,
    LootboxTrackerExpiredService,
  ],
})
export class LootboxTrackerModule {}
