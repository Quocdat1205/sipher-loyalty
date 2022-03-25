import { ERC1155Lootbox, PendingMint } from "@entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "@modules/auth/auth.module";
import { RedisCacheModule } from "@modules/cache/cache.module";

import { MintController } from "./mint.controller";
import { MintService } from "./mint.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([PendingMint, ERC1155Lootbox]),
    AuthModule,
    RedisCacheModule,
  ],
  providers: [MintService],
  controllers: [MintController],
  exports: [MintService],
})
export class MintModule {}
