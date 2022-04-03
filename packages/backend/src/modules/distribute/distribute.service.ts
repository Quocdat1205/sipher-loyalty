// import library
import fs from "fs";
import path from "path";

import axios from "axios";
import { toChecksumAddress } from "ethereumjs-util";
import { Contract, ethers, providers, Wallet } from "ethers";
import { Injectable } from "@nestjs/common";
import { erc1155Abi } from "@setting/blockchain/abis";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import constant, { Chain } from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";
import { getNow } from "@utils/utils";

@Injectable()
export class DistributeService {
  private srcSculpture = path.resolve(
    __dirname,
    `../../../src/data/DISTRIBUTE/SCULPTURE/data${
      constant.isProduction ? "" : "_test"
    }.json`
  );

  private sculptureHolder = JSON.parse(
    fs.readFileSync(this.srcSculpture).toString()
  );

  private srcLootbox = path.resolve(
    __dirname,
    `../../../src/data/DISTRIBUTE/LOOTBOX/data.json`
  );

  private lootboxHolder = JSON.parse(
    fs.readFileSync(this.srcLootbox).toString()
  );

  private provider: providers.Provider;

  private contract: Contract;

  private wallet: Wallet;

  private chain = constant.isProduction ? Chain.Polygon : Chain.Mumbai;

  constructor() {
    this.start();
  }

  private async start() {
    this.provider = await getProvider(this.chain);
    this.wallet = new ethers.Wallet(
      await constant.getPRIVATE_KEY_LOYALTY(),
      this.provider
    );
    this.contract = getContract(
      constant.config.erc1155Sculpture.verifyingContract,
      erc1155Abi,
      this.provider
    );
  }

  private findDuplicatesAddress(arr) {
    const nonDuplicate = [];
    const duplicate = [];
    for (let i = 0; i < arr.length; i++) {
      if (
        nonDuplicate.findIndex(
          (el) => el.toLowerCase() === arr[i].toLowerCase()
        ) === -1
      )
        nonDuplicate.push(arr[i].toLowerCase());
      else duplicate.push(arr[i].toLowerCase());
    }
    return { nonDuplicate, duplicate };
  }

  async checkDuplicateManual() {
    if (
      this.findDuplicatesAddress(
        this.sculptureHolder.map((el) => el.walletAddress)
      ).duplicate.length > 0
    ) {
      LoggerService.log(
        `duplicate : ${this.findDuplicatesAddress(
          this.sculptureHolder.map((el) => el.walletAddress)
        ).duplicate.join(", ")}`
      );
    }
  }

  async transferAll() {
    const allHolder = this.sculptureHolder.map((el) => ({
      address: el.address.toLowerCase(),
      INU: el.INU,
      NEKO: el.NEKO,
    }));

    if (
      this.findDuplicatesAddress(allHolder.map((el) => el.address)).duplicate
        .length > 0
    ) {
      LoggerService.log(
        `duplicate : ${this.findDuplicatesAddress(
          allHolder.map((el) => el.address)
        ).duplicate.join(", ")}`
      );
      return;
    }

    const onlyNekoHolder = allHolder
      .filter((el) => el.INU === "0" || el.INU === 0)
      .map((el) => ({
        address: toChecksumAddress(el.address),
        id: "1",
        amount: el.NEKO,
      }));

    const onlyInuHolder = allHolder
      .filter((el) => el.NEKO === "0" || el.NEKO === 0)
      .map((el) => ({
        address: toChecksumAddress(el.address),
        id: "0",
        amount: el.INU,
      }));

    const BothHolder = allHolder
      .filter(
        (el) =>
          el.NEKO !== "0" && el.INU !== "0" && el.NEKO !== 0 && el.INU !== 0
      )
      .map((el) => ({
        address: toChecksumAddress(el.address),
        ids: ["0", "1"],
        amounts: [el.INU, el.NEKO],
      }));
    LoggerService.log(
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
    const dataResult = [];
    try {
      await onlyNekoHolder.reduce(async (promise, data) => {
        await promise;
        LoggerService.log(data);
        dataResult.push(await this.safeTransferFrom(data));
      }, Promise.resolve());
      await onlyNekoHolder.reduce(async (promise, data) => {
        await promise;
        LoggerService.log(data);
        dataResult.push(await this.safeTransferFrom(data));
      }, Promise.resolve());
      await BothHolder.reduce(async (promise, data) => {
        await promise;
        LoggerService.log(data);
        dataResult.push(await this.safeBatchTransferFrom(data));
      }, Promise.resolve());
    } catch (err) {
      LoggerService.error(err);
    } finally {
      fs.writeFileSync(
        `./src/data/RESULT/SCULPTURE/${getNow()}.json`,
        JSON.stringify(dataResult)
      );
    }
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
    LoggerService.log(tx.hash);
    let result = {};
    try {
      result = await tx.wait();
    } catch (err) {
      LoggerService.error(err);
      return {
        address: toChecksumAddress(data.address),
        tx,
        result,
        error: true,
      };
    }
    return {
      address: toChecksumAddress(data.address),
      tx,
      result,
      error: false,
    };
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
    LoggerService.log(tx.hash);
    let result = {};
    try {
      result = await tx.wait();
    } catch (err) {
      LoggerService.error(err);
      return {
        address: toChecksumAddress(data.address),
        tx,
        result,
        error: true,
      };
    }
    return {
      address: toChecksumAddress(data.address),
      tx,
      result,
      error: false,
    };
  }

  async distributeForUser(claimableLootbox: {
    publicAddress: string;
    tokenId: number;
    quantity: number;
    expiredDate: number;
  }) {
    try {
      const { data } = await axios({
        method: "POST",
        url: constant.URL_DISTRIBUTE,
        headers: {
          Authorization: constant.TOKEN,
          "Content-Type": "application/json",
        },
        data: claimableLootbox,
      });

      return { ...data, error: false };
    } catch (err) {
      LoggerService.error(err);
      return { ...claimableLootbox, error: true };
    }
  }

  async distributeForUsers() {
    const result = [];
    await this.lootboxHolder.reduce(async (promise, data) => {
      await promise;
      data.publicAddress = data.publicAddress.toLowerCase();
      result.push(await this.distributeForUser(data));
    }, Promise.resolve());
    fs.writeFileSync(
      `./src/data/RESULT/LOOTBOX/${getNow()}.json`,
      JSON.stringify(result)
    );
  }

  async getUserData() {
    try {
      const { data } = await axios({
        method: "PUT",
        url: constant.URL_FETCH,
        headers: {
          Authorization: constant.TOKEN,
          "Content-Type": "application/json",
        },
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}
