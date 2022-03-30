import { Module } from "@nestjs/common";

import { DistributeSculptureService } from "./distributeSculpture.service";

@Module({
  providers: [DistributeSculptureService],
  exports: [DistributeSculptureService],
})
export class DistributeSculptureModule {}
