import { Lootbox, PendingMint } from "@entity";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "@setting/config.typeorm";
import constant from "@setting/constant";

import { LoggerModule } from "@modules/logger/logger.module";
import { LoggerService } from "@modules/logger/logger.service";
import { MintModule } from "@modules/mint/mint.module";
import { LootboxTrackerModule } from "@modules/trackers/erc1155_spaceship/lootbox/lootbox-tracker.module";
import { TrackedBlock } from "src/entity/tracking.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Lootbox, PendingMint, TrackedBlock]),
    LoggerModule,
    LootboxTrackerModule,
    MintModule,
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix("tracker");

  // setup logger

  // enable cors
  app.enableCors({ credentials: true, origin: true });

  const port = constant.PORT + 2;
  await app.listen(port, () => {
    LoggerService.log(
      `🚀 Transfer Lootbox tracker started. Health check listening on http://localhost:${port}/tracker`,
      "Bootstrap"
    );
  });
}
bootstrap();
