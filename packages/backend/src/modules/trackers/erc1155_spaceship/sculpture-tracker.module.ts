import { ShopifyCode } from "@entity";
import { MultiTokenService } from "@modules/multi-token/multi-token.service";
import { SculptureService } from "@modules/sculpture/sculpture.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TrackedBlock } from "src/entity/tracking.entity";
import { ScupltureTrackerService } from "./sculpture-tracker.service";

@Module({
  imports: [TypeOrmModule.forFeature([ShopifyCode, TrackedBlock])],
  providers: [ScupltureTrackerService, SculptureService, MultiTokenService],
  exports: [ScupltureTrackerService],
})
export class SculptureTrackerModule {}
