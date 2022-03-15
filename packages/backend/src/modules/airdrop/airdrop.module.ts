import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Airdrop } from "../../entity/airdrop.entity";

import { AirdropController } from "./airdrop.controller";
import { AirdropService } from "./airdrop.service";

@Module({
  imports: [TypeOrmModule.forFeature([Airdrop])],
  providers: [AirdropService],
  controllers: [AirdropController],
})
export class AirdropModule {}
