import { SculptureTransaction } from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SculptureController } from "./sculpture.controller";
import { SculptureService } from "./sculpture.service";

@Module({
  imports: [TypeOrmModule.forFeature([SculptureTransaction])],
  providers: [SculptureService],
  controllers: [SculptureController],
  exports: [SculptureService],
})
export class SculptureModule {}
