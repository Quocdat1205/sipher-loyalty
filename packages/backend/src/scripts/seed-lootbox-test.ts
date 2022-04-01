import { ClaimableLootbox, ERC1155Lootbox, Lootbox } from "@entity";
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "@setting/config.typeorm";

import { LootBoxModule } from "@modules/lootbox/lootbox.module";
import { SeedModule } from "@modules/seed/seed.module";
import { SeedLootboxService } from "@modules/seed/seedLootbox.service";

@Module({
  imports: [
    SeedModule,
    LootBoxModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => configService.getTypeOrmConfig(),
    }),
    TypeOrmModule.forFeature([Lootbox, ClaimableLootbox, ERC1155Lootbox]),
  ],
  providers: [SeedLootboxService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedLootboxService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seedLootboxCustom();
  }
}
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.close();
  process.exit(0);
}
bootstrap();
