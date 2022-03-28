import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { DistributeSculptureModule } from "@modules/distribute/distributeSculpture.module";
import { DistributeSculptureService } from "@modules/distribute/distributeSculpture.service";

@Module({
  imports: [DistributeSculptureModule, ConfigModule.forRoot()],
  providers: [],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly distributeSculptureService: DistributeSculptureService
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.distributeSculptureService.transferAll();
  }
}
async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
}
bootstrap();
