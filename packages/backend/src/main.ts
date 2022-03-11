// library
import { urlencoded } from "express";
import helmet from "helmet";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cors from "@setting/cors";
import appSession from "@setting/session";

import { AppModule } from "./modules/app/app.module";
import { LoggerService } from "./modules/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

  app.setGlobalPrefix("api/sipher/loyalty");
  const config = new DocumentBuilder()
    .setTitle("Sipher Loyalty")
    .setBasePath("api/sipher/loyalty")
    .setDescription("Sipher loyalty API documents")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      disableErrorMessages: false,
    })
  );
  app.use(helmet(), appSession);
  app.enableCors(cors);
  app.use(urlencoded({ extended: true, limit: "10mb" }));

  await app.listen(configService.get("PORT"), () => {
    LoggerService.log(
      `Server running port ${configService.get("PORT")}`,
      `🚀 API server listenning on http://localhost:${configService.get(
        "PORT"
      )}/api`
    );
  });
}
bootstrap();
