// import library
import fs from "fs";
import path from "path";

import { toChecksumAddress } from "ethereumjs-util";
import { Contract, ethers, providers, Wallet } from "ethers";
import { Injectable } from "@nestjs/common";
import { erc1155Abi } from "@setting/blockchain/abis";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant, { Chain } from "@setting/constant";

@Injectable()
export class DistributeSculptureService {
  private src = path.resolve(
    __dirname,
    `../../../src/data/DISTRIBUTE/SCULPTURE/data${
      constant.isProduction ? "" : "_test"
    }.json`
  );

  private sculptureHolder = JSON.parse(fs.readFileSync(this.src).toString());

  private provider: providers.Provider;

  private contract: Contract;

  private wallet: Wallet;

  constructor() {
    this.provider = getProvider(
      constant.isProduction ? Chain.Polygon : Chain.Mumbai
    );
    this.wallet = new ethers.Wallet(constant.PRIVATE_KEY, this.provider);
    this.contract = getContract(
      constant.config.erc1155Sculpture.verifyingContract,
      erc1155Abi,
      this.provider
    );
  }

  private findDuplicates(arr) {
    const holder = [];
    for (let i = 0; i < arr.length; i++) {
      if (
        holder.findIndex(
          (el) => el.toLowerCase() === arr[i].address.toLowerCase()
        ) === -1
      )
        holder.push(arr[i].address.toLowerCase());
      else return arr[i].address.toLowerCase();
    }
    return -1;
  }

  async transferAll() {
    const allHolder = this.sculptureHolder.map((el) => ({
      address: el.address.toLowerCase(),
      INU: el.INU,
      NEKO: el.NEKO,
    }));
    if (this.findDuplicates(allHolder) > -1) {
      console.log("duplicate at ", this.findDuplicates(allHolder));
      return;
    }
    const onlyNekoHolder = allHolder
      .filter((el) => el.INU === "0")
      .map((el) => ({
        address: toChecksumAddress(el.address),
        id: "1",
        amount: el.NEKO,
      }));

    const onlyInuHolder = allHolder
      .filter((el) => el.NEKO === "0")
      .map((el) => ({
        address: toChecksumAddress(el.address),
        id: "0",
        amount: el.INU,
      }));

    const BothHolder = allHolder
      .filter((el) => el.NEKO !== "0" && el.INU !== "0")
      .map((el) => ({
        address: toChecksumAddress(el.address),
        ids: ["0", "1"],
        amounts: [el.INU, el.NEKO],
      }));
    console.log(
      "all: ",
      this.sculptureHolder.length,
      "lower: ",
      allHolder.length,
      "Neko: ",
      onlyNekoHolder.length,
      "Inu: ",
      onlyInuHolder.length,
      "both: ",
      BothHolder.length
    );
    await onlyNekoHolder.reduce(async (promise, data) => {
      await promise;
      console.log(data);
      await this.safeTransferFrom(data);
    }, Promise.resolve());
    await onlyNekoHolder.reduce(async (promise, data) => {
      await promise;
      console.log(data);
      await this.safeTransferFrom(data);
    }, Promise.resolve());
    await BothHolder.reduce(async (promise, data) => {
      await promise;
      console.log(data);
      await this.safeBatchTransferFrom(data);
    }, Promise.resolve());
  }

  async safeTransferFrom(data) {
    const tx = await this.contract
      .connect(this.wallet)
      .safeTransferFrom(
        toChecksumAddress(this.wallet.address),
        toChecksumAddress(data.address),
        data.id,
        data.amount,
        "0x"
      );
    console.log(tx.hash);
    const result = await tx.wait();
    console.log(result);
  }

  async safeBatchTransferFrom(data) {
    const tx = await this.contract
      .connect(this.wallet)
      .safeBatchTransferFrom(
        this.wallet.address,
        data.address,
        data.ids,
        data.amounts,
        "0x"
      );
    console.log(tx.hash);
    const result = await tx.wait();
    console.log(result);
  }
}
