import { Canceled } from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CancelService } from "./cancel.service";

@Module({
  imports: [TypeOrmModule.forFeature([Canceled])],
  providers: [CancelService],
  exports: [CancelService],
})
export class CancelModule {}
