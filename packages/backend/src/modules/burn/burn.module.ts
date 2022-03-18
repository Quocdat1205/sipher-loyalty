import { Burned } from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BurnService } from "./burn.service";

@Module({
  imports: [TypeOrmModule.forFeature([Burned])],
  providers: [BurnService],
  exports: [BurnService],
})
export class BurnModule {}
