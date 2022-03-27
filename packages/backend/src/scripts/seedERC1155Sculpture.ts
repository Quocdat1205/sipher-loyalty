import { ERC1155Sculpture, ERC1155SculptureAttribute } from "@entity";
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "@setting/config.typeorm";

import { SeedModule } from "@modules/seed/seed.module";
import { SeedERC1155SculptureService } from "@modules/seed/seedAirdrop.service";

@Module({
  imports: [
    SeedModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([ERC1155Sculpture, ERC1155SculptureAttribute]),
  ],
  providers: [SeedERC1155SculptureService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedERC1155SculptureService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seedERC1155Sculptures();
  }
}
async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
}
bootstrap();
