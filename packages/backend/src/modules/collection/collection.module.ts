import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthCacheModule } from "@modules/auth/auth.module";
import { NftItemModule } from "@modules/nft/nftItem.module";
import { URIModule } from "@modules/uri/uri.module";
import { SipherCollection } from "src/entity/sipher-collection.entity";

import { CollectionController } from "./collection.controller";
import { CollectionService } from "./collection.service";

@Module({
  imports: [
    HttpModule,
    NftItemModule,
    URIModule,
    AuthCacheModule,
    TypeOrmModule.forFeature([SipherCollection]),
  ],
  providers: [CollectionService],
  controllers: [CollectionController],
  exports: [CollectionService],
})
export class CollectionModule {}
