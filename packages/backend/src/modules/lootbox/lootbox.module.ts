import { Lootbox } from "@entity";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MintModule } from "@modules/mint/mint.module";

import { LootBoxController } from "./lootbox.controller";
import { LootBoxService } from "./lootbox.service";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Lootbox]),
    MintModule,
  ],
  providers: [LootBoxService],
  controllers: [LootBoxController],
  exports: [LootBoxService],
})
export class LootBoxModule {}
