import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthCacheModule } from "@modules/auth/auth.module";
import { MerchModule } from "@modules/merch/merch.module";

import { Airdrop } from "../../entity/airdrop.entity";

import { AirdropController } from "./airdrop.controller";
import { AirdropService } from "./airdrop.service";

@Module({
  imports: [TypeOrmModule.forFeature([Airdrop]), AuthCacheModule, MerchModule],
  providers: [AirdropService],
  controllers: [AirdropController],
})
export class AirdropModule {}
