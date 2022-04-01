import {
  ERC1155Lootbox,
  ERC1155LootboxAttribute,
  ERC1155Sculpture,
  ERC1155SculptureAttribute,
} from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "@modules/auth/auth.module";
import { RedisCacheModule } from "@modules/cache/cache.module";

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
    AuthModule,
    RedisCacheModule,
  ],
  providers: [URIService],
  controllers: [URIController],
  exports: [URIService],
})
export class URIModule {}
