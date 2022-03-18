import { PendingMint } from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MintController } from "./mint.controller";
import { MintService } from "./mint.service";

@Module({
  imports: [TypeOrmModule.forFeature([PendingMint])],
  providers: [MintService],
  controllers: [MintController],
  exports: [MintService],
})
export class MintModule {}
