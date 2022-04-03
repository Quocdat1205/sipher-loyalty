import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { DistributeModule } from "@modules/distribute/distribute.module";
import { DistributeService } from "@modules/distribute/distribute.service";

@Module({
  imports: [DistributeModule, ConfigModule.forRoot()],
  providers: [],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly distributeService: DistributeService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.distributeService.getUserData();
    await this.distributeService.distributeForUsers();
  }
}
async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
}
bootstrap();
