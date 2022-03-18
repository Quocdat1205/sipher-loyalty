import {
  ERC1155Sculpture,
  ERC1155SculptureAttribute,
  ERC1155SpaceShipPartLootbox,
  ERC1155SpaceShipPartLootboxAttribute,
} from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { URIController } from "./uri.controller";
import { URIService } from "./uri.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ERC1155SpaceShipPartLootbox,
      ERC1155SpaceShipPartLootboxAttribute,
      ERC1155Sculpture,
      ERC1155SculptureAttribute,
    ]),
  ],
  providers: [URIService],
  controllers: [URIController],
  exports: [URIService],
})
export class URIModule {}
