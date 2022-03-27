import { SculptureTransaction } from "@entity";
import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SculptureModule } from "@modules/sculpture/sculpture.module";
import { TrackedBlock } from "src/entity/tracking.entity";

import { ScupltureTrackerService } from "./sculpture-tracker.service";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SculptureModule,
    TypeOrmModule.forFeature([SculptureTransaction, TrackedBlock]),
  ],
  providers: [ScupltureTrackerService],
  exports: [ScupltureTrackerService],
})
export class SculptureTrackerModule {}
