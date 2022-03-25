import { Module } from "@nestjs/common";

import { PriceController } from "./price.controller";
import { PriceService } from "./price.service";

@Module({
  providers: [PriceService],
  controllers: [PriceController],
})
export class PriceModule {}
