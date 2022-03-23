import {
  ERC1155Sculpture,
  ERC1155SculptureAttribute,
  ERC1155Lootbox,
  ERC1155LootboxAttribute,
} from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { URIController } from "./uri.controller";
import { URIService } from "./uri.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ERC1155Lootbox,
      ERC1155LootboxAttribute,
      ERC1155Sculpture,
      ERC1155SculptureAttribute,
    ]),
  ],
  providers: [URIService],
  controllers: [URIController],
  exports: [URIService],
})
export class URIModule {}
