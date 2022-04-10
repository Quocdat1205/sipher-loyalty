// import library
import fs from "fs";

import { Contract, providers, Wallet } from "ethers";
import { Injectable } from "@nestjs/common";
import { erc721Abi } from "@setting/blockchain/abis";
import { getContract, getProvider } from "@setting/blockchain/ethers";
import { Chain } from "@setting/constant";

import { getNow } from "@utils/utils";

@Injectable()
export class SnapshotService {
  private provider: providers.Provider;

  private contractInu: Contract;

  private contractNeko: Contract;

  private wallet: Wallet;

  private chain = Chain.Mainnet;

  constructor() {
    this.start();
  }

  private async start() {
    this.provider = await getProvider(this.chain);
    this.contractInu = getContract(
      "0x9c57D0278199c931Cf149cc769f37Bb7847091e7",
      erc721Abi,
      this.provider
    );
    this.contractNeko = getContract(
      "0x09E0dF4aE51111CA27d6B85708CFB3f1F7cAE982",
      erc721Abi,
      this.provider
    );
  }

  async snapshot() {
    // INU
    await this.checkowners("INU", this.contractInu);
    const inu = await this.readFile("INU");
    const holderInu = [];
    for (let i = 0; i <= 9999; i++) {
      if (holderInu.filter((el) => el.holder === inu[i]).length === 0) {
        holderInu.push({
          holder: inu[i],
          balance: inu.filter((el) => el === inu[i]).length,
        });
      }
    }
    fs.writeFileSync(
      `./src/data/SNAPSHOT/snapshot_INU_${getNow()}.json`,
      JSON.stringify(
        holderInu.sort((a, b) => {
          if (a.balance > b.balance) {
            return -1;
          }
          if (a.balance < b.balance) {
            return 1;
          }
          return 0;
        })
      )
    );
    // NEKO
    await this.checkowners("NEKO", this.contractNeko);
    const neko = await this.readFile("NEKO");
    const holderNeko = [];
    for (let i = 0; i <= 9999; i++) {
      if (holderNeko.filter((el) => el.holder === neko[i]).length === 0) {
        holderNeko.push({
          holder: neko[i],
          balance: neko.filter((el) => el === neko[i]).length,
        });
      }
    }
    fs.writeFileSync(
      `./src/data/SNAPSHOT/snapshot_NEKO_${getNow()}.json`,
      JSON.stringify(
        holderNeko.sort((a, b) => {
          if (a.balance > b.balance) {
            return -1;
          }
          if (a.balance < b.balance) {
            return 1;
          }
          return 0;
        })
      )
    );
  }

  async check(name: string) {
    const neko = await this.readFile("NEKO");
    const holderNeko = [];
    for (let i = 0; i <= 9999; i++) {
      if (holderNeko.filter((el) => el.holder === neko[i]).length === 0) {
        holderNeko.push({
          holder: neko[i],
          balance: neko.filter((el) => el === neko[i]).length,
        });
      }
    }
    console.log(
      "checked balance of ",
      name,
      "is ",
      holderNeko.reduce((prev, curr) => prev + curr.balance, 0)
    );
  }

  async readFile(name: string) {
    let data = [];
    for (let i = 0; i < 10; i++) {
      const readData = JSON.parse(
        fs
          .readFileSync(`./src/data/SNAPSHOT/holder_${name}_${i}.json`)
          .toString()
      );
      data = [...data, ...readData];
    }
    return data;
  }

  async checkowner(contract: Contract, i: number) {
    try {
      return contract.ownerOf(i);
    } catch (err) {
      console.log(` error at ${i}`);
      return "0x";
    }
  }

  async checkowners(name: string, contract: Contract) {
    const result = [];
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(i);
    }
    await array.reduce(async (promise, num) => {
      await promise;
      const promises = [];
      for (let i = num * 1000 + 1; i <= num * 1000 + 1000; i++)
        promises.push(this.checkowner(contract, i));
      const inu = await Promise.all(promises);
      fs.writeFileSync(
        `./src/data/SNAPSHOT/holder_${name}_${num}.json`,
        JSON.stringify(inu)
      );
      console.log(`done pack ${num + 1}`);
    }, Promise.resolve());
    return result;
  }
}
