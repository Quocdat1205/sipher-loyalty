import { Airdrop, ImageUrl, Item } from "@entity";
import { MerchModule } from "@modules/merch/merch.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
  imports: [MerchModule, TypeOrmModule.forFeature([Item, ImageUrl, Airdrop])],
  providers: [AdminService],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
