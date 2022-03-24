import { Item, Transaction } from "@entity";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MerchService } from "./merch.service";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Transaction, Item]),
  ],
  providers: [MerchService],
  exports: [MerchService],
})
export class MerchModule {}
