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
  SipherCollection,
} from "@entity";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AirdropModule } from "@modules/airdrop/airdrop.module";
import { AirdropService } from "@modules/airdrop/airdrop.service";
import { AuthModule } from "@modules/auth/auth.module";
import { AuthService } from "@modules/auth/auth.service";
import { BurnService } from "@modules/burn/burn.service";
import { RedisCacheModule } from "@modules/cache/cache.module";
import { CancelService } from "@modules/cancel/cancel.service";
import { CollectionService } from "@modules/collection/collection.service";
import { LootBoxModule } from "@modules/lootbox/lootbox.module";
import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { MerchModule } from "@modules/merch/merch.module";
import { MintService } from "@modules/mint/mint.service";
import { NftItemService } from "@modules/nft/nftItem.service";
import { URIModule } from "@modules/uri/uri.module";
import { URIService } from "@modules/uri/uri.service";

import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
  imports: [
    MerchModule,
    LootBoxModule,
    URIModule,
    AirdropModule,
    HttpModule,
    AuthModule,
    RedisCacheModule,
    TypeOrmModule.forFeature([
      Item,
      ImageUrl,
      Airdrop,
      Lootbox,
      ClaimableLootbox,
      ERC1155Sculpture,
      ERC1155Lootbox,
      PendingMint,
      Burned,
      Canceled,
      ERC1155LootboxAttribute,
      ERC1155SculptureAttribute,
      SipherCollection,
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
    CollectionService,
    NftItemService,
  ],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
