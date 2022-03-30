/* eslint-disable @typescript-eslint/naming-convention */
import "@env";

import { Injectable } from "@nestjs/common";

import { ZERO_ADDRESS } from "@utils/constants";

export enum Chain {
  Mainnet = 1,
  Rinkeby = 4,
  Mumbai = 80001,
  Polygon = 137,
}

type BlockchainConfiguration = {
  rpcUrls: { [k in Chain]: string };
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
  PORT = parseInt(this.get("PORT"), 10);

  MODE = this.get("MODE");

  NODE_ENV = this.get("NODE_ENV");

  POSTGRES_HOST = this.get("POSTGRES_HOST");

  POSTGRES_PORT = this.get("POSTGRES_PORT");

  POSTGRES_USER = this.get("POSTGRES_USER");

  POSTGRES_PASSWORD = this.get("POSTGRES_PASSWORD");

  POSTGRES_DATABASE = this.get("POSTGRES_DATABASE");

  POSTGRES_SYNCHRONIZE = this.get("POSTGRES_SYNCHRONIZE");

  SESSION_PORT = this.get("SESSION_PORT");

  SESSION_PASS = this.get("SESSION_PASS");

  SESSION_HOST = this.get("SESSION_HOST");

  SC_INFURA = this.get("SC_INFURA");

  AWS_ACCESS_KEY_ID = this.get("AWS_ACCESS_KEY_ID");

  AWS_SECRET_ACCESS_KEY = this.get("AWS_SECRET_ACCESS_KEY");

  AWS_REGION = this.get("AWS_REGION");

  AWS_NAME_BUCKET = this.get("AWS_NAME_BUCKET");

  ELASTICSEARCH_ENDPOINT = this.get("ELASTICSEARCH_ENDPOINT");

  ELASTICSEARCH_INDEX = this.get("ELASTICSEARCH_INDEX");

  PRIVATE_KEY = this.get("PRIVATE_KEY");

  ATHER_ID_URL = this.get("ATHER_ID_URL");

  PENDING_TIME_LOOTBOX_MINT = 86400 * 3;

  MARKETPLACE_SDK_URL = this.get("MARKETPLACE_SDK_URL");

  ATHER_SOCIAL_URL = this.get("ATHER_SOCIAL_URL");

  public get isDebugging() {
    return !!this.get("DEBUG");
  }

  public get isProduction() {
    return this.get("NODE_ENV", "development") === "production";
  }

  public get isTest() {
    return this.get("NODE_ENV", "development") === "test";
  }

  public get blockchain(): BlockchainConfiguration {
    const rpcUrls = {
      [Chain.Mainnet]: `https://mainnet.infura.io/v3/${this.SC_INFURA}`,
      [Chain.Rinkeby]: `https://rinkeby.infura.io/v3/${this.SC_INFURA}`,
      [Chain.Mumbai]: `https://polygon-mumbai.infura.io/v3/${this.SC_INFURA}`,
      [Chain.Polygon]: `https://polygon-mainnet.infura.io/v3/${this.SC_INFURA}`,
    };

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
        address: ZERO_ADDRESS,
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

    return { rpcUrls, contracts: { erc1155LootBox, erc1155Sculpture } };
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

  public get(key: string, defaultValue?: string) {
    return process.env[key] || defaultValue;
  }
}

const constant = new SystemConfigProvider();

export default constant;
