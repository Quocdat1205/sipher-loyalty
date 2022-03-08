import { ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute, Lootbox } from "@entity"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { LootBoxModule } from "@modules/lootbox/lootbox.module"

import { SeedService } from "./seed.service"

@Module({
  imports: [
    LootBoxModule,
    TypeOrmModule.forFeature([ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute, Lootbox]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
