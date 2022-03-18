import {
  ERC1155SpaceShipPartLootbox,
  ERC1155SpaceShipPartLootboxAttribute,
} from "@entity";
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "@setting/config.typeorm";

import { SeedModule } from "@modules/seed/seed.module";
import { SeedERC1155SpaceshipService } from "@modules/seed/seedERC1155Spaceship.service";

@Module({
  imports: [
    SeedModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([
      ERC1155SpaceShipPartLootbox,
      ERC1155SpaceShipPartLootboxAttribute,
    ]),
  ],
  providers: [SeedERC1155SpaceshipService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedERC1155SpaceshipService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seedERC1155SpaceShipPartLootboxs();
  }
}
async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
}
bootstrap();
