import { Lootbox, PendingMint } from "@entity"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { TypeOrmModule } from "@nestjs/typeorm"
import { configService } from "@setting/config.typeorm"
import constant from "@setting/constant"

import { LoggerModule } from "@modules/logger/logger.module"
import { LoggerService } from "@modules/logger/logger.service"
import { MintModule } from "@modules/mint/mint.module"
import { LootboxTrackerModule } from "@modules/trackers/erc1155_spaceship/lootbox-tracker.module"

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Lootbox, PendingMint]),
    LoggerModule,
    LootboxTrackerModule,
    MintModule,
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })

  app.setGlobalPrefix("tracker")

  // setup logger

  // enable cors
  app.enableCors({ credentials: true, origin: true })

  const port = constant.PORT + 2
  await app.listen(port, () => {
    LoggerService.log(
      `🚀 Transfer Lootbox tracker started. Health check listening on http://localhost:${port}/tracker`,
      "Bootstrap",
    )
  })

  // await tracker.initCollection('0x4d91fa57abfead5fbc8445e45b906b85bbd9744c', 9751804); // INU
  // await tracker.initCollection('0x97c8480d593b93ae90f8613a5b2ac02e7a3dd0ed', 9751807); // NEKO
}
bootstrap()
