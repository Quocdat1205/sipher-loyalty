import { Module } from "@nestjs/common";
import { MultiTokenController } from "./multi-token.controller";
import { MultiTokenService } from "./multi-token.service";

@Module({
  providers: [MultiTokenService],
  exports: [MultiTokenService],
  controllers: [MultiTokenController],
})
export class MultiTokenModule {}
