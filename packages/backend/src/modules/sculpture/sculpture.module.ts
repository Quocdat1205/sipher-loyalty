import { ShopifyCode } from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MultiTokenService } from "@modules/multi-token/multi-token.service";

import { SculptureController } from "./sculpture.controller";
import { SculptureService } from "./sculpture.service";

@Module({
  imports: [TypeOrmModule.forFeature([ShopifyCode])],
  providers: [MultiTokenService, SculptureService],
  controllers: [SculptureController],
  exports: [SculptureService],
})
export class SculptureModule {}
