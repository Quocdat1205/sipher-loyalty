// library
import path from "path";

import { urlencoded } from "express";
import helmet from "helmet";
import { generateApi } from "swagger-typescript-api";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import constant from "@setting/constant";
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

  // generate typescript api
  if (!constant.isDebugging) {
    await generateApi({
      name: "sdk",
      output: path.resolve(__dirname, "../../frontend/src/api"),
      spec: document as any,
      templates: path.resolve(__dirname, "../src/swagger-templates"),
      prettier: {
        singleQuote: true,
        jsxSingleQuote: false,
        arrowParens: "avoid",
        trailingComma: "all",
        tabWidth: 2,
        printWidth: 100,
        parser: "typescript",
      },
      httpClientType: "axios",
    });
  }

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
