// import library
import Joi from "joi"
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"

// import module
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { User, Program, SculpturesOrder, NftOrder } from "@entity"
import validation from "@setting/validationSchema"
import { AuthMiddleware } from "@middleware"
import { NftItemModule } from "@module/nft/nftItem.module"
import { SearchModule } from "@module/search/search.module"
import { configService } from "@setting/config.typeorm"
import { UserModule } from "@module/user/user.module"
import { AuthModule } from "@module/auth/auth.module"
import { LoggerModule } from "@module/logger/logger.module"
import { AdminModule } from "@module/admin/admin.module"
import { MintModule } from "../mint/mint.module"
import { LootBoxModule } from "../lootbox/lootbox.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object(validation),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User, Program, SculpturesOrder, NftOrder]),
    SearchModule,
    UserModule,
    LoggerModule,
    AuthModule,
    NftItemModule,
    AdminModule,
    MintModule,
    LootBoxModule,
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
        { path: "/users/get-info", method: RequestMethod.GET },
      )
  }
}
