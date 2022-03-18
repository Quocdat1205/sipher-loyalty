// import library
import Joi from "joi";
import { NftOrder, Program, SculpturesOrder, ShopifyCode, User } from "@entity";
import { AuthMiddleware } from "@middleware";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "@setting/config.typeorm";
import validation from "@setting/validationSchema";

import { AdminModule } from "@modules/admin/admin.module";
import { AirdropModule } from "@modules/airdrop/airdrop.module";
import { AuthModule } from "@modules/auth/auth.module";
import { CollectionModule } from "@modules/collection/collection.module";
import { LoggerModule } from "@modules/logger/logger.module";
import { NftItemModule } from "@modules/nft/nftItem.module";
import { SearchModule } from "@modules/search/search.module";
import { URIModule } from "@modules/uri/uri.module";
import { UserModule } from "@modules/user/user.module";

import { LootBoxModule } from "../lootbox/lootbox.module";
import { MintModule } from "../mint/mint.module";

// import module
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MultiTokenModule } from "@modules/multi-token/multi-token.module";
import { SculptureModule } from "@modules/sculpture/sculpture.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object(validation),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([
      User,
      Program,
      SculpturesOrder,
      NftOrder,
      ShopifyCode,
    ]),
    SearchModule,
    UserModule,
    LoggerModule,
    AuthModule,
    NftItemModule,
    AdminModule,
    MintModule,
    LootBoxModule,
    URIModule,
    CollectionModule,
    AirdropModule,
    MultiTokenModule,
    SculptureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: "user/sign", method: RequestMethod.POST },
        { path: "/users/get-info", method: RequestMethod.GET }
      );
  }
}
