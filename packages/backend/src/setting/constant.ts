/* eslint-disable @typescript-eslint/naming-convention */
import "@env"

import { Injectable } from "@nestjs/common"

export enum Chain {
  Mainnet = 1,
  Rinkeby = 4,
}

type BlockchainConfiguration = {
  rpcUrls: { [k in Chain]: string }
  contracts: {
    erc1155Spaceship: { [k in Chain]: { address: string; startBlock?: number } }
  }
}

type ConfigMint = {
  erc1155Spaceship: {
    chainId: number
    verifyingContract: string
  }
}
@Injectable()
export class SystemConfigProvider {
  PORT = this.get("PORT")

  MODE = this.get("MODE")

  SECRET_KEY = this.get("SECRET_KEY")

  NODE_ENV = this.get("NODE_ENV")

  JWT_EXPIRATION_TIME = this.get("JWT_EXPIRATION_TIME")

  SESSION_PORT = this.get("SESSION_PORT")

  SESSION_HOST = this.get("SESSION_HOST")

  SC_INFURA = this.get("SC_INFURA")

  SC_NFT_INU = this.get("SC_NFT_INU")

  SC_NFT_NEKO = this.get("SC_NFT_NEKO")

  SC_ERC1155_SPACESHIP = this.get("SC_ERC1155_SPACESHIP")

  USERNAME = this.get("USERNAME")

  PASSWORD = this.get("PASSWORD")

  TK_WEB = this.get("TK_WEB")

  PW_WEB = this.get("PW_WEB")

  AWS_ACCESS_KEY_ID = this.get("AWS_ACCESS_KEY_ID")

  AWS_SECRET_ACCESS_KEY = this.get("AWS_SECRET_ACCESS_KEY")

  AWS_REGION = this.get("AWS_REGION")

  AWS_NAME_BUCKET = this.get("AWS_NAME_BUCKET")

  AWS_UPLOAD_FILE_URL_LINK = this.get("AWS_UPLOAD_FILE_URL_LINK")

  ELASTICSEARCH_ENDPOINT = this.get("ELASTICSEARCH_ENDPOINT")

  ELASTICSEARCH_INDEX = this.get("ELASTICSEARCH_INDEX")

  AWS_REGION_S3 = this.get("AWS_REGION_S3")

  AWS_ACCESS_KEY_ID_S3 = this.get("AWS_ACCESS_KEY_ID_S3")

  PRIVATE_KEY = this.get("PRIVATE_KEY")

  CHAIN_ID = parseInt(this.get("CHAIN_ID"), 10)

  ERC1155_SPACESHIP_STARTBLOCK = this.get("ERC1155_SPACESHIP_STARTBLOCK")

  public get isDebugging() {
    return !!this.get("DEBUG")
  }

  public get isProduction() {
    return this.get("NODE_ENV", "development") === "production"
  }

  public get isTest() {
    return this.get("NODE_ENV", "development") === "test"
  }

  public get config(): ConfigMint {
    return {
      erc1155Spaceship: {
        chainId: this.CHAIN_ID,
        verifyingContract: this.get(`SC_ERC1155_SPACESHIP_${this.CHAIN_ID}`),
      },
    }
  }

  public get blockchain(): BlockchainConfiguration {
    const rpcUrls = {
      [Chain.Mainnet]: this.get(`https://mainnet.infura.io/v3/${this.SC_INFURA}`),
      [Chain.Rinkeby]: this.get(`https://rinkeby.infura.io/v3/${this.SC_INFURA}`),
    }

    const erc1155Spaceship = {
      [Chain.Mainnet]: {
        address: this.get(`${this.SC_ERC1155_SPACESHIP}_${Chain.Mainnet}`),
        startBlock: Number.parseInt(this.get(`ERC1155_SPACESHIP_STARTBLOCK_${Chain.Mainnet}`, "0"), 10),
      },
      [Chain.Rinkeby]: {
        address: this.get(`${this.SC_ERC1155_SPACESHIP}_${Chain.Rinkeby}`),
        startBlock: Number.parseInt(this.get(`ERC1155_SPACESHIP_STARTBLOCK_${Chain.Rinkeby}`, "0"), 10),
      },
    }
    return { rpcUrls, contracts: { erc1155Spaceship } }
  }

  public get(key: string, defaultValue?: string) {
    return process.env[key] || defaultValue
  }
}

const constant = new SystemConfigProvider()

export default constant

// import * as dotenv from "dotenv"
// // import AWS, { Credentials } from 'aws-sdk';
// dotenv.config()
// const constant: { [key: string]: any } = {}
// define("PORT", process.env.PORT)
// define("MODE", process.env.MODE)
// define("SECRET_KEY", process.env.SECRET_KEY || "")
// define("NODE_ENV", process.env.NODE_ENV)
// define("JWT_EXPIRATION_TIME", process.env.JWT_EXPIRATION_TIME)
// define("SESSION_PORT", process.env.SESSION_PORT)
// define("SESSION_HOST", process.env.SESSION_HOST)
// define("SC_INFURA", process.env.SC_INFURA)
// define("SC_NFT_INU", process.env.SC_NFT_INU)
// define("SC_NFT_NEKO", process.env.SC_NFT_NEKO)
// define("SC_ERC1155_SPACESHIP", process.env.SC_ERC1155_SPACESHIP)
// define("USERNAME", process.env.USERNAME)
// define("PASSWORD", process.env.PASSWORD)
// define("TK_WEB", process.env.TK_WEB)
// define("PW_WEB", process.env.PW_WEB)
// define("AWS_ACCESS_KEY_ID", process.env.AWS_ACCESS_KEY_ID)
// define("AWS_SECRET_ACCESS_KEY", process.env.AWS_SECRET_ACCESS_KEY)
// define("AWS_REGION", process.env.AWS_REGION)
// define("AWS_NAME_BUCKET", process.env.AWS_NAME_BUCKET)
// define("AWS_UPLOAD_FILE_URL_LINK", process.env.AWS_UPLOAD_FILE_URL_LINK)
// define("ELASTICSEARCH_ENDPOINT", process.env.ELASTICSEARCH_ENDPOINT)
// define("ELASTICSEARCH_INDEX", process.env.ELASTICSEARCH_INDEX)

// define("AWS_REGION_S3", process.env.AWS_REGION_S3)
// define("AWS_ACCESS_KEY_ID_S3", process.env.AWS_ACCESS_KEY_ID_S3)

// define("PRIVATE_KEY", process.env.PRIVATE_KEY)
// define("CHAIN_ID", parseInt(process.env.CHAIN_ID, 10))

// function define(key: string, value: any) {
//   Object.defineProperty(constant, key, {
//     value,
//     enumerable: true,
//   })
// }

// export default constant
