import {
  Airdrop,
  Burned,
  Canceled,
  ClaimableLootbox,
  ERC1155Lootbox,
  ERC1155LootboxAttribute,
  ERC1155Sculpture,
  ERC1155SculptureAttribute,
  ImageUrl,
  Item,
  Lootbox,
  PendingMint,
} from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AirdropService } from "@modules/airdrop/airdrop.service";
import { AuthModule } from "@modules/auth/auth.module";
import { AuthService } from "@modules/auth/auth.service";
import { BurnService } from "@modules/burn/burn.service";
import { RedisCacheModule } from "@modules/cache/cache.module";
import { CancelService } from "@modules/cancel/cancel.service";
import { LootBoxModule } from "@modules/lootbox/lootbox.module";
import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { MerchModule } from "@modules/merch/merch.module";
import { MintService } from "@modules/mint/mint.service";
import { URIService } from "@modules/uri/uri.service";

import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
  imports: [
    MerchModule,
    LootBoxModule,
    AuthModule,
    RedisCacheModule,
    TypeOrmModule.forFeature([
      Item,
      ImageUrl,
      Airdrop,
      Lootbox,
      ClaimableLootbox,
      ERC1155Lootbox,
      ERC1155Sculpture,
      ERC1155LootboxAttribute,
      ERC1155SculptureAttribute,
      PendingMint,
      Burned,
      Canceled,
    ]),
  ],
  providers: [
    AdminService,
    LootBoxService,
    AuthService,
    MintService,
    BurnService,
    CancelService,
    URIService,
    AirdropService,
  ],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
