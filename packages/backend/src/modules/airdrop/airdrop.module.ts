import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "@modules/auth/auth.module";
import { RedisCacheModule } from "@modules/cache/cache.module";
import { MerchModule } from "@modules/merch/merch.module";

import { Airdrop } from "../../entity/airdrop.entity";

import { AirdropController } from "./airdrop.controller";
import { AirdropService } from "./airdrop.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Airdrop]),
    AuthModule,
    MerchModule,
    RedisCacheModule,
  ],
  providers: [AirdropService],
  controllers: [AirdropController],
})
export class AirdropModule {}
