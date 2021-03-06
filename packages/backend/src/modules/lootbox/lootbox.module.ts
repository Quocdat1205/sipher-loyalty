import { ERC1155Lootbox, Lootbox } from "@entity";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "@modules/auth/auth.module";
import { BurnModule } from "@modules/burn/burn.module";
import { RedisCacheModule } from "@modules/cache/cache.module";
import { CancelModule } from "@modules/cancel/cancel.module";
import { MintModule } from "@modules/mint/mint.module";
import { ClaimableLootbox } from "src/entity/claimableLootbox.entity";

import { LootBoxController } from "./lootbox.controller";
import { LootBoxService } from "./lootbox.service";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Lootbox, ClaimableLootbox, ERC1155Lootbox]),
    MintModule,
    BurnModule,
    CancelModule,
    RedisCacheModule,
    CancelModule,
    AuthModule,
  ],
  providers: [LootBoxService],
  controllers: [LootBoxController],
  exports: [LootBoxService],
})
export class LootBoxModule {}
