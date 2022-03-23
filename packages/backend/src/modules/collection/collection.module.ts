import { NftItemModule } from "@modules/nft/nftItem.module";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SipherCollection } from "src/entity/sipher-collection.entity";

import { CollectionController } from "./collection.controller";
import { CollectionService } from "./collection.service";

@Module({
  imports: [
    HttpModule,
    NftItemModule,
    TypeOrmModule.forFeature([SipherCollection]),
  ],
  providers: [CollectionService],
  controllers: [CollectionController],
  exports: [CollectionService],
})
export class CollectionModule {}
