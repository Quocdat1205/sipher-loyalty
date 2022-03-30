// import library
import Joi from "joi";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "@setting/config.typeorm";

import { AirdropModule } from "@modules/airdrop/airdrop.module";
import { CollectionModule } from "@modules/collection/collection.module";
import { LoggerModule } from "@modules/logger/logger.module";
import { MerchModule } from "@modules/merch/merch.module";
import { NftItemModule } from "@modules/nft/nftItem.module";
import { PriceModule } from "@modules/price/price.module";
import { SculptureModule } from "@modules/sculpture/sculpture.module";
import { SearchModule } from "@modules/search/search.module";
import { URIModule } from "@modules/uri/uri.module";

import { LootBoxModule } from "../lootbox/lootbox.module";
import { MintModule } from "../mint/mint.module";

// import module
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => configService.getTypeOrmConfig(),
    }),
    SearchModule,
    LoggerModule,
    NftItemModule,
    MintModule,
    LootBoxModule,
    URIModule,
    CollectionModule,
    AirdropModule,
    SculptureModule,
    MerchModule,
    PriceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
