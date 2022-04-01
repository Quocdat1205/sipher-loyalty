// library
import path from "path";

import { json, urlencoded } from "express";
import helmet from "helmet";
import { generateApi } from "swagger-typescript-api";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import constant from "@setting/constant";

import { AppModule } from "./modules/app/app.module";
import { LoggerService } from "./modules/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix("api/sipher/loyalty");

  if (constant.enableSwagger) {
    const config = new DocumentBuilder()
      .setTitle("Sipher Loyalty")
      .setDescription("Sipher loyalty API documents")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "JWT",
          description: "Enter JWT token",
          in: "header",
        },
        "JWT-auth" // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
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
          printWidth: 160,
          parser: "typescript",
        },
        httpClientType: "axios",
      });
    }
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      disableErrorMessages: false,
    })
  );

  app.use(helmet());
  app.enableCors({ credentials: true, origin: true });
  app.set("trust proxy", 1);
  app.use(json({ limit: "10mb" }));
  app.use(urlencoded({ extended: true, limit: "10mb" }));
  await app.listen(constant.PORT, () => {
    LoggerService.log(
      `Server running port ${constant.PORT}`,
      `🚀 API server listenning on http://localhost:${constant.PORT}/api`
    );
  });
}
bootstrap();
