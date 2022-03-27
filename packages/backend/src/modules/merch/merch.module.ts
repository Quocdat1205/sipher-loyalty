import {
  Address,
  ImageUrl,
  Item,
  ItemOrder,
  MerchList,
  Order,
  Receiver,
} from "@entity";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MerchService } from "./merch.service";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      MerchList,
      Address,
      Item,
      ItemOrder,
      Receiver,
      Order,
      ImageUrl,
    ]),
  ],
  providers: [MerchService],
  exports: [MerchService],
})
export class MerchModule {}
