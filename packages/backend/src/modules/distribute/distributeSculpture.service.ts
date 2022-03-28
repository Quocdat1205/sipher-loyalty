// import library
import fs from "fs";
import path from "path";

import { Contract, providers } from "ethers";
import { Injectable } from "@nestjs/common";
import { erc1155Abi } from "@setting/blockchain/abis";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant, { Chain } from "@setting/constant";

@Injectable()
export class DistributeSculptureService {
  private src = path.resolve(
    __dirname,
    `../../../src/data/LOOTBOX/data${constant.isProduction ? "" : "_test"}.json`
  );

  private sculptureHolder = JSON.parse(fs.readFileSync(this.src).toString());

  private provider: providers.Provider;

  private contract: Contract;

  private fromBlockCanceled: number;

  constructor() {
    this.provider = getProvider(
      constant.isProduction ? Chain.Polygon : Chain.Mumbai
    );
    this.contract = getContract(
      constant.config.erc1155Sculpture.verifyingContract,
      erc1155Abi,
      this.provider
    );
  }
}
