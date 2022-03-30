/* eslint-disable @typescript-eslint/naming-convention */
import "@env";

import { SSM } from "aws-sdk";
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

  public async getPOSTGRES_URL() {
    return this.getSync("POSTGRES_URL");
  }

  public async getSESSION_URL() {
    return this.get("SESSION_URL");
  }

  public async getKEY_INFURA() {
    return this.get("KEY_INFURA");
  }

  public async getPRIVATE_KEY_LOYALTY() {
    return this.get("PRIVATE_KEY_LOYALTY");
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

  public async getRpcUrls() {
    return {
      [Chain.Mainnet]: `https://mainnet.infura.io/v3/${await this.getKEY_INFURA()}`,
      [Chain.Rinkeby]: `https://rinkeby.infura.io/v3/${await this.getKEY_INFURA()}`,
      [Chain.Mumbai]: `https://polygon-mumbai.infura.io/v3/${await this.getKEY_INFURA()}`,
      [Chain.Polygon]: `https://polygon-mainnet.infura.io/v3/${await this.getKEY_INFURA()}`,
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
        address: "0xD95006adFd42E582367Ea5Da3e0A875d68a97308",
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
        address: "0x8832B826C4194Ed54bA9f1423fdB82295c09f0c9",
      },

      [Chain.Polygon]: {
        address: "0x315Bc085A14E251f129A361afa37205E3313bF15",
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

  private async get(key: string, defaultValue?: string): Promise<string> {
    const value = process.env[key];
    if (value === undefined) return defaultValue;
    if (value.startsWith("ssm:")) {
      const ssm = new SSM();
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
