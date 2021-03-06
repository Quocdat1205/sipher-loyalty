/* eslint-disable @typescript-eslint/naming-convention */
import "@env";

import AWS, { Credentials, SSM } from "aws-sdk";
import { Injectable } from "@nestjs/common";

import { ZERO_ADDRESS } from "@utils/constants";

export enum Chain {
  Mainnet = 1,
  Rinkeby = 4,
  Mumbai = 80001,
  Polygon = 137,
}

type BlockchainConfiguration = {
  contracts: {
    erc1155LootBox: {
      [k in Chain]: { address: string };
    };
    erc1155Sculpture: {
      [k in Chain]: { address: string };
    };
  };
};

type ConfigMint = {
  erc1155LootBox: {
    chainId: number;
    verifyingContract: string;
  };
  erc1155Sculpture: {
    chainId: number;
    verifyingContract: string;
  };
};
@Injectable()
export class SystemConfigProvider {
  PENDING_TIME_LOOTBOX_MINT = 86400 * 3;

  PORT = parseInt(this.getSync("PORT"), 10);

  NODE_ENV = this.getSync("NODE_ENV");

  POSTGRES_SYNCHRONIZE = this.getSync("POSTGRES_SYNCHRONIZE", "false");

  ELASTICSEARCH_ENDPOINT = this.getSync("ELASTICSEARCH_ENDPOINT");

  ELASTICSEARCH_INDEX = this.getSync("ELASTICSEARCH_INDEX");

  ATHER_ID_URL = this.getSync("ATHER_ID_URL");

  ATHER_SOCIAL_URL = this.getSync("ATHER_SOCIAL_URL");

  MARKETPLACE_SDK_URL = this.getSync("MARKETPLACE_SDK_URL");

  URL_DISTRIBUTE = this.getSync("URL_DISTRIBUTE");

  URL_FETCH = this.getSync("URL_FETCH");

  TOKEN = this.getSync("TOKEN");

  ENABLE_METRICS = this.getSync("ENABLE_METRICS", "false");

  public async getPOSTGRES_URL() {
    return this.get("POSTGRES_URL");
  }

  public async getSESSION_URL() {
    return this.get("SESSION_URL");
  }

  public async getPRIVATE_KEY_LOYALTY_SPACESHIP() {
    return this.get("PRIVATE_KEY_LOYALTY_SPACESHIP");
  }

  public get isDebugging() {
    return !!this.getSync("DEBUG");
  }

  public get isProduction() {
    return this.getSync("NODE_ENV", "development") === "production";
  }

  public get isTest() {
    return this.getSync("NODE_ENV", "development") === "test";
  }

  public get enableSwagger() {
    return !this.isTest && (!this.isProduction || this.isDebugging);
  }

  public async getRpcUrls() {
    return {
      [Chain.Mainnet]: await this.get("RPC_URL_ETHEREUM"),
      [Chain.Rinkeby]: this.getSync("RPC_URL_RINKERBY"),
      [Chain.Mumbai]: this.getSync("RPC_URL_POLYGON_MUMBAI"),
      [Chain.Polygon]: await this.get("RPC_URL_POLYGON_MAINNET"),
    };
  }

  public get blockchain(): BlockchainConfiguration {
    const erc1155LootBox = {
      [Chain.Mainnet]: {
        address: ZERO_ADDRESS,
      },
      [Chain.Rinkeby]: {
        address: ZERO_ADDRESS,
      },
      [Chain.Mumbai]: {
        address: "0x3E445D426c8FdE12F5F0C223019CA9158f7Da93B",
      },

      [Chain.Polygon]: {
        address: "0x105c1fDa04c7406D4106C96bc5b674f7d6B1A617",
      },
    };

    const erc1155Sculpture = {
      [Chain.Mainnet]: {
        address: ZERO_ADDRESS,
      },
      [Chain.Rinkeby]: {
        address: ZERO_ADDRESS,
      },
      [Chain.Mumbai]: {
        address: "0x3EdB954303D0A13ee347C6989189294B0422E7D6",
      },

      [Chain.Polygon]: {
        address: "0x04c20C117F7F470620F45a1c685f50ef1516a958",
      },
    };

    return { contracts: { erc1155LootBox, erc1155Sculpture } };
  }

  public get config(): ConfigMint {
    const chainId = this.isProduction ? Chain.Polygon : Chain.Mumbai;
    return {
      erc1155LootBox: {
        chainId,
        verifyingContract:
          this.blockchain.contracts.erc1155LootBox[chainId].address,
      },
      erc1155Sculpture: {
        chainId,
        verifyingContract:
          this.blockchain.contracts.erc1155Sculpture[chainId].address,
      },
    };
  }

  public getSync(key: string, defaultValue?: string) {
    return process.env[key] || defaultValue;
  }

  public get awsCredentials(): Promise<Credentials> {
    if (process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI) {
      const ecsCredentials = new AWS.ECSCredentials();
      return ecsCredentials.getPromise().then(() => ecsCredentials);
    }
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      const envCredentials = new AWS.EnvironmentCredentials("AWS");
      return envCredentials.getPromise().then(() => envCredentials);
    }
    if (process.env.AWS_SDK_LOAD_CONFIG) {
      const localCredentials = new AWS.SharedIniFileCredentials();
      return localCredentials.getPromise().then(() => localCredentials);
    }
  }

  private async get(key: string, defaultValue?: string): Promise<string> {
    const value = process.env[key];
    if (value === undefined) return defaultValue;

    if (value.startsWith("ssm:")) {
      const credentials = await Promise.resolve(this.awsCredentials);
      const ssm = new SSM({ credentials });

      const param = await ssm
        .getParameter({
          Name: value.slice(4),
          WithDecryption: true,
        })
        .promise();

      return param.Parameter?.Value ?? defaultValue;
    }

    return value;
  }
}

const constant = new SystemConfigProvider();

export default constant;
