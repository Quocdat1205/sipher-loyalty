import { ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute } from "@entity"
import { Module, OnApplicationBootstrap } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { TypeOrmModule } from "@nestjs/typeorm"
import { configService } from "@setting/config.typeorm"

import { SeedModule } from "@modules/seed/seed.module"
import { SeedService } from "@modules/seed/seed.service"

@Module({
  imports: [
    SeedModule,
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    // TypeOrmModule.forRoot({
    //   type: "postgres",
    //   host: "localhost",
    //   port: 5432,
    //   username: "postgres",
    //   password: "12345678",
    //   database: "loyalty_sipher",
    //   entities: [ERC1155SpaceShipPartLootbox, ERC1155SpaceShipPartLootboxAttribute],
    //   cli: {
    //     entitiesDir: "src/entity",
    //   },
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
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
  await NestFactory.createApplicationContext(AppModule)
}
bootstrap()
