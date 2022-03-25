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
    erc1155Spaceship: {
      [k in Chain]: { address: string };
    };
    erc1155Sculpture: {
      [k in Chain]: { address: string };
    };
  };
};

type ConfigMint = {
  erc1155Spaceship: {
    chainId: number;
    verifyingContract: string;
  };
};
@Injectable()
export class SystemConfigProvider {
  PORT = parseInt(this.get("PORT"), 10);

  MODE = this.get("MODE");

  SECRET_KEY = this.get("SECRET_KEY");

  NODE_ENV = this.get("NODE_ENV");

  JWT_EXPIRATION_TIME = this.get("JWT_EXPIRATION_TIME");

  SESSION_PORT = this.get("SESSION_PORT");

  SESSION_PASS = this.get("SESSION_PASS");

  SESSION_HOST = this.get("SESSION_HOST");

  SC_INFURA = this.get("SC_INFURA");

  POLYGON_RPC_URL = this.get("POLYGON_RPC_URL");

  SC_NFT_INU = this.get("SC_NFT_INU");

  SC_NFT_NEKO = this.get("SC_NFT_NEKO");

  USERNAME = this.get("USERNAME");

  PASSWORD = this.get("PASSWORD");

  TK_WEB = this.get("TK_WEB");

  PW_WEB = this.get("PW_WEB");

  ID_SIPHER = this.get("ID_SIPHER");

  API_KEY_CMC = this.get("API_KEY_CMC");

  AWS_ACCESS_KEY_ID = this.get("AWS_ACCESS_KEY_ID");

  AWS_SECRET_ACCESS_KEY = this.get("AWS_SECRET_ACCESS_KEY");

  AWS_REGION = this.get("AWS_REGION");

  AWS_NAME_BUCKET = this.get("AWS_NAME_BUCKET");

  AWS_UPLOAD_FILE_URL_LINK = this.get("AWS_UPLOAD_FILE_URL_LINK");

  ELASTICSEARCH_ENDPOINT = this.get("ELASTICSEARCH_ENDPOINT");

  ELASTICSEARCH_INDEX = this.get("ELASTICSEARCH_INDEX");

  AWS_REGION_S3 = this.get("AWS_REGION_S3");

  AWS_ACCESS_KEY_ID_S3 = this.get("AWS_ACCESS_KEY_ID_S3");

  PRIVATE_KEY = this.get("PRIVATE_KEY");

  CHAIN_ID = parseInt(this.get("CHAIN_ID"), 10);

  ATHER_ID_URL = this.get("ATHER_ID_URL");

  PENDING_TIME_LOOTBOX_MINT = 86400 * 3;

  MARKETPLACE_SDK_URL = this.get("MARKETPLACE_SDK_URL");

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
      [Chain.Mumbai]: `${this.POLYGON_RPC_URL}`,
      [Chain.Polygon]: `${this.POLYGON_RPC_URL}`,
    };

    const erc1155Spaceship = {
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
        address: "0x3EdB954303D0A13ee347C6989189294B0422E7D6",
      },

      [Chain.Polygon]: {
        address: ZERO_ADDRESS,
      },
    };

    return { rpcUrls, contracts: { erc1155Spaceship, erc1155Sculpture } };
  }

  public get config(): ConfigMint {
    return {
      erc1155Spaceship: {
        chainId: this.isProduction ? Chain.Polygon : Chain.Mumbai,
        verifyingContract:
          this.blockchain.contracts.erc1155Spaceship[
            this.isProduction ? Chain.Polygon : Chain.Mumbai
          ].address,
      },
    };
  }

  public get(key: string, defaultValue?: string) {
    return process.env[key] || defaultValue;
  }
}

const constant = new SystemConfigProvider();

export default constant;
