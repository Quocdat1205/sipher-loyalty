import { ShopifyCode } from "@entity";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "@setting/config.typeorm";
import constant from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";
import { SculptureTrackerModule } from "@modules/trackers/erc1155_spaceship/sculpture-tracker.module";
import { TrackedBlock } from "src/entity/tracking.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([ShopifyCode, TrackedBlock]),
    SculptureTrackerModule,
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix("tracker");

  // setup logger

  // enable cors
  app.enableCors({ credentials: true, origin: true });

  const port = constant.PORT + 3;
  await app.listen(port, () => {
    LoggerService.log(
      `🚀 Transfer Lootbox tracker started. Health check listening on http://localhost:${port}/tracker`,
      "Bootstrap"
    );
  });
}
bootstrap();
