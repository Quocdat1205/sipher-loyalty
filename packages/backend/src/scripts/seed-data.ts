import { ERC1155Lootbox, ERC1155LootboxAttribute } from "@entity";
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "@setting/config.typeorm";

import { SeedModule } from "@modules/seed/seed.module";
import { SeedAirdropService } from "@modules/seed/seedAirdrop.service";
import { SeedERC1155LootboxService } from "@modules/seed/seedERC1155Lootbox.service";
import { SeedERC1155SculptureService } from "@modules/seed/seedERC1155Sculpture.service";
import { SeedSipherCollectionService } from "@modules/seed/seedSipherCollection.service";

@Module({
  imports: [
    SeedModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => configService.getTypeOrmConfig(),
    }),
    TypeOrmModule.forFeature([ERC1155Lootbox, ERC1155LootboxAttribute]),
  ],
  providers: [SeedERC1155LootboxService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly seedERC1155LootboxService: SeedERC1155LootboxService,
    private readonly seedERC1155SculptureService: SeedERC1155SculptureService,
    private readonly seedAirdropService: SeedAirdropService,
    private readonly seedSipherCollectionService: SeedSipherCollectionService
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedERC1155LootboxService.seedERC1155Lootboxs();
    await this.seedERC1155SculptureService.seedERC1155Sculptures();
    await this.seedAirdropService.seedMerchs();
    await this.seedAirdropService.seedItems();
    await this.seedSipherCollectionService.seedCollections();
    await this.seedAirdropService.seedTokens();
  }
}
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.close();
  process.exit(0);
}
bootstrap();
