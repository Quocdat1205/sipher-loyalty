import {
  ERC1155SpaceShipPartLootbox,
  ERC1155SpaceShipPartLootboxAttribute,
  Lootbox,
} from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LootBoxModule } from "@modules/lootbox/lootbox.module";
import { Airdrop } from "src/entity/airdrop.entity";

import { SeedAirdropService } from "./seedAirdrop.service";
import { SeedERC1155Service } from "./seedERC1155.service";
import { SeedLootboxService } from "./seedLootbox.service";

@Module({
  imports: [
    LootBoxModule,
    TypeOrmModule.forFeature([
      ERC1155SpaceShipPartLootbox,
      ERC1155SpaceShipPartLootboxAttribute,
      Lootbox,
      Airdrop,
    ]),
  ],
  providers: [SeedAirdropService, SeedERC1155Service, SeedLootboxService],
  exports: [SeedAirdropService, SeedERC1155Service, SeedLootboxService],
})
export class SeedModule {}
