import {
  ERC1155Sculpture,
  ERC1155SculptureAttribute,
  ERC1155SpaceShipPartLootbox,
  ERC1155SpaceShipPartLootboxAttribute,
  Lootbox,
  Merch,
} from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LootBoxModule } from "@modules/lootbox/lootbox.module";
import { Airdrop } from "src/entity/airdrop.entity";

import { SeedAirdropService } from "./seedAirdrop.service";
import { SeedERC1155SculptureService } from "./seedERC1155Sculpture.service";
import { SeedERC1155SpaceshipService } from "./seedERC1155Spaceship.service";
import { SeedLootboxService } from "./seedLootbox.service";

@Module({
  imports: [
    LootBoxModule,
    TypeOrmModule.forFeature([
      ERC1155SpaceShipPartLootbox,
      ERC1155SpaceShipPartLootboxAttribute,
      ERC1155Sculpture,
      ERC1155SculptureAttribute,
      Lootbox,
      Airdrop,
      Merch,
    ]),
  ],
  providers: [
    SeedAirdropService,
    SeedERC1155SpaceshipService,
    SeedERC1155SculptureService,
    SeedLootboxService,
  ],
  exports: [
    SeedAirdropService,
    SeedERC1155SpaceshipService,
    SeedERC1155SculptureService,
    SeedLootboxService,
  ],
})
export class SeedModule {}
