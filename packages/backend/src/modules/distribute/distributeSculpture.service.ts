// import library
import fs from "fs";
import path from "path";

import { Contract, ethers, providers } from "ethers";
import { Injectable } from "@nestjs/common";
import { sculptureAbi } from "@setting/blockchain/abis/sculpture";
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

  private wallet;

  private contractWithSigner;

  constructor() {
    this.provider = getProvider(
      constant.isProduction ? Chain.Polygon : Chain.Mumbai
    );
    this.contract = getContract(
      constant.config.erc1155Sculpture.verifyingContract,
      sculptureAbi,
      this.provider
    );
    this.wallet = new ethers.Wallet(constant.PRIVATE_KEY, this.provider);
    this.contractWithSigner = this.contract.connect(this.wallet);
  }

  private findDuplicates = (arr) =>
    arr.filter((item, index) => arr.indexOf(item.address) !== index);

  async mintAll() {
    console.log(this.sculptureHolder);
    const allHolder = this.sculptureHolder.map((el) => ({
      address: el.address,
      INU: el.INU,
      NEKO: el.NEKO,
    }));
    console.log("dup: ", this.findDuplicates(allHolder));
    const onlyNekoHolder = allHolder.filter((el) => el.INU === "0");
    const onlyInuHolder = allHolder.filter((el) => el.NEKO === "0");
    const BothHolder = allHolder.filter(
      (el) => el.NEKO !== "0" && el.INU !== "0"
    );
    console.log(onlyNekoHolder, onlyInuHolder, BothHolder);
  }

  async mintBacthTo() {
    const tx = await this.contractWithSigner.mintBatchTo(
      "0x42c07BBEFE0AD00D55D1fa1BeC0E72D80d25fF94",
      [1],
      [1]
    );
    console.log(tx.hash);
    const result = await tx.wait();
    console.log(result);
  }
}
