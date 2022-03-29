import { join } from "path";

import dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import constant from "./constant";

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions & {
    seeds: string[];
    factories: string[];
  } {
    return {
      type: "postgres",

      host: constant.POSTGRES_HOST,
      port: parseInt(constant.POSTGRES_PORT, 10),
      username: constant.POSTGRES_USER,
      password: constant.POSTGRES_PASSWORD,
      database: constant.POSTGRES_DATABASE,
      entities: ["src/entity/*.entity{.ts,.js}"],

      migrationsTableName: "migration",

      seeds: ["src/seed/*{.ts,.js}"],

      factories: ["src/factory/*{.ts,.js}"],

      migrations: ["src/migration/*.{ts,js}"],

      cli: {
        migrationsDir: "src/migration",
      },

      synchronize: constant.POSTGRES_SYNCHRONIZE === "true",

      // logging: ["query", "error"],

      autoLoadEntities: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DATABASE",
]);

export { configService };
