import { Merch } from "@entity";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MerchController } from "./merch.controller";
import { MerchService } from "./merch.service";

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Merch])],
  providers: [MerchService],
  controllers: [MerchController],
  exports: [],
})
export class MerchModule {}
