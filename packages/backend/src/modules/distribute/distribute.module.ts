import { Module } from "@nestjs/common";

import { DistributeService } from "./distribute.service";

@Module({
  providers: [DistributeService],
  exports: [DistributeService],
})
export class DistributeModule {}
