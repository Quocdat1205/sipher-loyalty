import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { SeedLootboxService } from "@modules/seed/seedLootbox.service";

@Module({
  imports: [DistributeSculptureModule, ConfigModule.forRoot()],
  providers: [],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedLootboxService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seedLootboxCustom();
  }
}
async function bootstrap() {
  NestFactory.createApplicationContext(AppModule);
}
bootstrap();
