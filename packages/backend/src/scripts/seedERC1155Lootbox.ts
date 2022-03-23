import { ERC1155Lootbox, ERC1155LootboxAttribute } from "@entity";
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "@setting/config.typeorm";

import { SeedModule } from "@modules/seed/seed.module";
import { SeedERC1155LootboxService } from "@modules/seed/seedERC1155Lootbox.service";

@Module({
  imports: [
    SeedModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([ERC1155Lootbox, ERC1155LootboxAttribute]),
  ],
  providers: [SeedERC1155LootboxService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedERC1155LootboxService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seedERC1155Lootboxs();
  }
}
async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
}
bootstrap();
