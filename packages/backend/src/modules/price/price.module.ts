import { Module } from "@nestjs/common";

import { AuthModule } from "@modules/auth/auth.module";
import { RedisCacheModule } from "@modules/cache/cache.module";

import { PriceController } from "./price.controller";
import { PriceService } from "./price.service";

@Module({
  imports: [AuthModule, RedisCacheModule],
  providers: [PriceService],
  controllers: [PriceController],
})
export class PriceModule {}
