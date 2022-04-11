import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { SnapshotModule } from "@modules/snapshot/snapshot.module";
import { SnapshotService } from "@modules/snapshot/snapshot.service";

@Module({
  imports: [SnapshotModule, ConfigModule.forRoot()],
  providers: [],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly snapshotService: SnapshotService) {}

  async onApplicationBootstrap(): Promise<void> {
    // await this.snapshotService.snapshot();
    await this.snapshotService.check("INU");
    await this.snapshotService.check("NEKO");
  }
}
async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
}
bootstrap();
