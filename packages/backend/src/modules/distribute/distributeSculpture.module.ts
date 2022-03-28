import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LootBoxModule } from "@modules/lootbox/lootbox.module";
import { Airdrop } from "src/entity/airdrop.entity";

@Module({
  imports: 
  providers: [
    DistributeSculptureService,
  ],
  exports: [
    DistributeSculptureService,
  ],
})
export class DistributeSculptureModule {}
