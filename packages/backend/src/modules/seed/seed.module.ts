import { ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute } from "@entity"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { SeedService } from "./seed.service"

@Module({
  imports: [TypeOrmModule.forFeature([ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
