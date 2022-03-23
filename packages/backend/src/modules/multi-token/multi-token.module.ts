import { Module } from "@nestjs/common";

import { MultiTokenService } from "./multi-token.service";

@Module({
  providers: [MultiTokenService],
  exports: [MultiTokenService],
})
export class MultiTokenModule {}
