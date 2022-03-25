import { Module } from "@nestjs/common";

import { AuthCacheModule } from "@modules/auth/auth.module";

import { PriceController } from "./price.controller";
import { PriceService } from "./price.service";

@Module({
  imports: [AuthCacheModule],
  providers: [PriceService],
  controllers: [PriceController],
})
export class PriceModule {}
