import console from "console"

import { getConnectionOptions } from "typeorm"
import { ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute } from "@entity"
import { Module, OnApplicationBootstrap } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { TypeOrmModule } from "@nestjs/typeorm"

import { SeedService } from "@modules/seed/seed.service"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    TypeOrmModule.forFeature([ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute]),
  ],
  providers: [SeedService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seedERC1155SpaceShipPartLootboxs()
  }
}
async function bootstrap() {
  NestFactory.createApplicationContext(AppModule)
}
bootstrap()
