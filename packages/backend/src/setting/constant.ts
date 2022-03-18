/* eslint-disable @typescript-eslint/naming-convention */
import "@env";

import { Injectable } from "@nestjs/common";

export enum Chain {
  Mainnet = 1,
  Rinkeby = 4,
  Mumbai = 80001,
}

type BlockchainConfiguration = {
  rpcUrls: { [k in Chain]: string };
  contracts: {
    erc1155Spaceship: {
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
  PORT = this.get("PORT");

  MODE = this.get("MODE");

  SECRET_KEY = this.get("SECRET_KEY");

  NODE_ENV = this.get("NODE_ENV");

  JWT_EXPIRATION_TIME = this.get("JWT_EXPIRATION_TIME");

  SESSION_PORT = this.get("SESSION_PORT");

  SESSION_HOST = this.get("SESSION_HOST");

  SC_INFURA = this.get("SC_INFURA");

  POLYGON_RPC_URL = this.get("POLYGON_RPC_URL");

  SC_NFT_INU = this.get("SC_NFT_INU");

  SC_NFT_NEKO = this.get("SC_NFT_NEKO");

  SC_ERC1155_SPACESHIP = this.get("SC_ERC1155_SPACESHIP");

  USERNAME = this.get("USERNAME");

  PASSWORD = this.get("PASSWORD");

  TK_WEB = this.get("TK_WEB");

  PW_WEB = this.get("PW_WEB");

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

  public get isDebugging() {
    return !!this.get("DEBUG");
  }

  public get isProduction() {
    return this.get("NODE_ENV", "development") === "production";
  }

  public get isTest() {
    return this.get("NODE_ENV", "development") === "test";
  }

  public get config(): ConfigMint {
    return {
      erc1155Spaceship: {
        chainId: this.CHAIN_ID,
        verifyingContract: this.get(`SC_ERC1155_SPACESHIP_${this.CHAIN_ID}`),
      },
    };
  }

  public get blockchain(): BlockchainConfiguration {
    const rpcUrls = {
      [Chain.Mainnet]: `https://mainnet.infura.io/v3/${this.SC_INFURA}`,
      [Chain.Rinkeby]: `https://rinkeby.infura.io/v3/${this.SC_INFURA}`,
      [Chain.Mumbai]: `${this.POLYGON_RPC_URL}`,
    };

    const erc1155Spaceship = {
      [Chain.Mainnet]: {
        address: this.get(`${this.SC_ERC1155_SPACESHIP}_${Chain.Mainnet}`),
      },
      [Chain.Rinkeby]: {
        address: this.get(`${this.SC_ERC1155_SPACESHIP}_${Chain.Rinkeby}`),
      },
      [Chain.Mumbai]: {
        address: this.get(`${this.SC_ERC1155_SPACESHIP}_${Chain.Mumbai}`),
      },
    };

    return { rpcUrls, contracts: { erc1155Spaceship } };
  }

  public get(key: string, defaultValue?: string) {
    return process.env[key] || defaultValue;
  }
}

const constant = new SystemConfigProvider();

export default constant;
