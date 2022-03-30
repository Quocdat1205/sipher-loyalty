import { join } from "path";

import dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import constant from "./constant";

dotenv.config();

class ConfigService {
  private async getInfoPG() {
    const [_UserAndPass, _HostPortDB] = (
      await constant.getPOSTGRES_URL()
    ).split("@");
    const [, _User, password] = _UserAndPass.split(":");
    const [, , username] = _User.split("/");
    const [host, _PortDB] = _HostPortDB.split(":");
    const [port, database] = _PortDB.split("/");
    return {
      username,
      password,
      host,
      port: parseInt(port, 10),
      database,
    };
    return { username: "", password: "", host: "", port: 0, database: "" };
  }

  public async getTypeOrmConfig(): Promise<
    TypeOrmModuleOptions & {
      seeds: string[];
      factories: string[];
    }
  > {
    const { username, password, host, port, database } = await this.getInfoPG();

    return {
      type: "postgres",
      host,
      port,
      username,
      password,
      database,
      entities: [join(__dirname, "..", "**", "*.entity{.ts,.js}")],

      migrationsTableName: "migration",

      seeds: ["src/seed/*{.ts,.js}"],

      factories: ["src/factory/*{.ts,.js}"],

      migrations: [join(__dirname, "..", "migration", "*{.ts,.js}")],

      cli: {
        migrationsDir: "src/migration",
      },

      synchronize: constant.POSTGRES_SYNCHRONIZE === "true",

      // logging: ["query", "error"],

      autoLoadEntities: true,
    };
  }
}

const configService = new ConfigService();

export { configService };
