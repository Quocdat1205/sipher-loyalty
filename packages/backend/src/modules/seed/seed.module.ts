import {
  ClaimableLootbox,
  ERC1155Lootbox,
  ERC1155LootboxAttribute,
  ERC1155Sculpture,
  ERC1155SculptureAttribute,
  ImageUrl,
  Item,
  Lootbox,
  Merchandise,
} from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LootBoxModule } from "@modules/lootbox/lootbox.module";
import { Airdrop } from "src/entity/airdrop.entity";

import { SeedAirdropService } from "./seedAirdrop.service";
import { SeedERC1155LootboxService } from "./seedERC1155Lootbox.service";
import { SeedERC1155SculptureService } from "./seedERC1155Sculpture.service";
import { SeedLootboxService } from "./seedLootbox.service";

@Module({
  imports: [
    LootBoxModule,
    TypeOrmModule.forFeature([
      ERC1155Lootbox,
      ERC1155LootboxAttribute,
      ERC1155Sculpture,
      ERC1155SculptureAttribute,
      Lootbox,
      Airdrop,
      ClaimableLootbox,
      Item,
      ImageUrl,
      Merchandise,
    ]),
  ],
  providers: [
    SeedAirdropService,
    SeedERC1155LootboxService,
    SeedERC1155SculptureService,
    SeedLootboxService,
  ],
  exports: [
    SeedAirdropService,
    SeedERC1155LootboxService,
    SeedERC1155SculptureService,
    SeedLootboxService,
  ],
})
export class SeedModule {}
