import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "@modules/auth/auth.module";
import { RedisCacheModule } from "@modules/cache/cache.module";
import { NftItemModule } from "@modules/nft/nftItem.module";
import { URIModule } from "@modules/uri/uri.module";
import { SipherCollection } from "@entity";

import { CollectionController } from "./collection.controller";
import { CollectionService } from "./collection.service";

@Module({
  imports: [
    HttpModule,
    NftItemModule,
    URIModule,
    AuthModule,
    RedisCacheModule,
    TypeOrmModule.forFeature([SipherCollection]),
  ],
  providers: [CollectionService],
  controllers: [CollectionController],
  exports: [CollectionService],
})
export class CollectionModule {}
