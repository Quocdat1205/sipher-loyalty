import { MerchModule } from "@modules/merch/merch.module";
import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";

@Module({
  imports: [MerchModule],
  providers: [],
  exports: [],
  controllers: [AdminController],
})
export class AdminModule {}
