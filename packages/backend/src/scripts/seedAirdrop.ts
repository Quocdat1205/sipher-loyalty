import {
  ERC1155SpaceShipPartLootbox,
  ERC1155SpaceShipPartLootboxAttribute,
  Lootbox,
  Merch,
} from "@entity";
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "@setting/config.typeorm";

import { SeedModule } from "@modules/seed/seed.module";
import { SeedAirdropService } from "@modules/seed/seedAirdrop.service";
import { Airdrop } from "src/entity/airdrop.entity";

@Module({
  imports: [
    SeedModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Airdrop, Merch]),
  ],
  providers: [SeedAirdropService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedAirdropService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seedAirdropHolder();
    await this.seedingService.seedAirdropInvestor_CP1();
    await this.seedingService.seedAirdropMerch();
  }
}
async function bootstrap() {
  NestFactory.createApplicationContext(AppModule);
}
bootstrap();
