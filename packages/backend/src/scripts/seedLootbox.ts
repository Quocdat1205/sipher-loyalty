import { ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute, Lootbox } from "@entity"
import { Module, OnApplicationBootstrap } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { TypeOrmModule } from "@nestjs/typeorm"
import { configService } from "@setting/config.typeorm"

import { LootBoxModule } from "@modules/lootbox/lootbox.module"
import { SeedModule } from "@modules/seed/seed.module"
import { SeedService } from "@modules/seed/seed.service"

@Module({
  imports: [
    SeedModule,
    LootBoxModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Lootbox, ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute]),
  ],
  providers: [SeedService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seedLootbox()
  }
}
async function bootstrap() {
  NestFactory.createApplicationContext(AppModule)
}
bootstrap()
