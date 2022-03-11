import { Lootbox, PendingMint } from "@entity";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { MintModule } from "@modules/mint/mint.module";

import { LootboxTrackerService } from "./lootbox-tracker.service";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Lootbox, PendingMint]),
    MintModule,
  ],
  providers: [LootboxTrackerService, LootBoxService],
  exports: [LootboxTrackerService],
})
export class LootboxTrackerModule {}
