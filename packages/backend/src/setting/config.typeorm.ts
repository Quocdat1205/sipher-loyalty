import { join } from "path";

import dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import constant from "./constant";

dotenv.config();

class ConfigService {
  public async getTypeOrmConfig(): Promise<
    TypeOrmModuleOptions & {
      seeds: string[];
      factories: string[];
    }
  > {
    return {
      type: "postgres",
      url: await constant.getPOSTGRES_URL(),
      entities: [join(__dirname, "..", "**", "*.entity{.ts,.js}")],

      migrationsTableName: "migration",

      seeds: ["src/seed/*{.ts,.js}"],

      factories: ["src/factory/*{.ts,.js}"],

      migrations: [join(__dirname, "..", "migration", "*{.ts,.js}")],

      cli: {
        migrationsDir: "src/migration",
      },

      synchronize: constant.POSTGRES_SYNCHRONIZE === "true",

      logging: !!constant.isDebugging,

      autoLoadEntities: true,
    };
  }
}

const configService = new ConfigService();

export { configService };
