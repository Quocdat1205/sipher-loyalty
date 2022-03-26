// import library
import fs from "fs";
import path from "path";

import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Airdrop } from "src/entity/airdrop.entity";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedAirdropService {
  private src = path.resolve(__dirname, "../../../src/data");

  private airdropDataHolder = JSON.parse(
    fs.readFileSync(`${this.src}/AIRDROP/holder.json`).toString()
  );

  private airdropDataMerchTransaction = JSON.parse(
    fs.readFileSync(`${this.src}/AIRDROP/MERCH/transaction.json`).toString()
  );

  private airdropDataMerchItem = JSON.parse(
    fs.readFileSync(`${this.src}/AIRDROP/MERCH/item.json`).toString()
  );

  constructor(
    @InjectRepository(Airdrop)
    private airdropRepo: Repository<Airdrop>
  ) {}

  seedAirdropHolder = async () => {
    const flaternAirdrop = this.airdropDataHolder.data.map((el) => ({
      merkleRoot: this.airdropDataHolder.merkleRoot,
      imageUrl: this.airdropDataHolder.imageUrl,
      ...el,
      addressContract: this.airdropDataHolder.addressContract,
      startTime: this.airdropDataHolder.startTime,
      vestingInterval: this.airdropDataHolder.vestingInterval,
      numberOfVestingPoint: this.airdropDataHolder.numberOfVestingPoint,
      name: this.airdropDataHolder.name,
      description: this.airdropDataHolder.description,
    }));
    await this.airdropRepo.query(
      `delete from airdrop where "addressContract"='${this.airdropDataHolder.addressContract}';`
    );

    const promises = [];
    for (let i = 0; i < flaternAirdrop.length; i++) {
      const query = `insert into airdrop ("merkleRoot","imageUrl","proof","leaf","claimer","addressContract","totalAmount","startTime","vestingInterval","numberOfVestingPoint","name","description","type") values (
            '${flaternAirdrop[i].merkleRoot}',
            '${flaternAirdrop[i].imageUrl}',
            '${`{${flaternAirdrop[i].proof.join(",")}}`}',
            '${flaternAirdrop[i].leaf}',
            '${flaternAirdrop[i].claimer.toLowerCase()}',
            '${flaternAirdrop[i].addressContract}',
            '${flaternAirdrop[i].totalAmount}',
            '${flaternAirdrop[i].startTime}',
            '${flaternAirdrop[i].vestingInterval}',
            '${flaternAirdrop[i].numberOfVestingPoint}',
            '${flaternAirdrop[i].name}',
            '${flaternAirdrop[i].description}',
            'TOKEN');`;
      // LoggerService.log(query);
      promises.push(this.airdropRepo.query(query));
    }
    await Promise.all(promises);

    const airdropCount = await this.airdropRepo.query(
      `select count(*) from airdrop where "addressContract"='${this.airdropDataHolder.addressContract}';`
    );
    LoggerService.log(
      `Check airdrop Holder : ${
        parseInt(airdropCount[0].count, 10) === flaternAirdrop.length
          ? "OK"
          : "Failed"
      }
        `
    );
  };

  private seedMerchTransaction = async () => {
    await this.airdropRepo.query(`delete from transaction`);
    const promises = [];

    for (let i = 0; i < this.airdropDataMerchTransaction.length; i++) {
      const query = `insert into transaction ("publicAddress","tier","merch_item","quantity","quantity_shipped") values (
            '${this.airdropDataMerchTransaction[i].publicAddress}',
            '${this.airdropDataMerchTransaction[i].investor_type}',
            '${this.airdropDataMerchTransaction[i].merch_item}',
            '${this.airdropDataMerchTransaction[i].quantity}',
            '${this.airdropDataMerchTransaction[i].quantity}');`;
      // LoggerService.log(query);
      promises.push(this.airdropRepo.query(query));
    }
    await Promise.all(promises);

    const airdropCount = await this.airdropRepo.query(
      `select count(*) from transaction `
    );
    LoggerService.log(
      `Check airdrop merch transaction : ${
        parseInt(airdropCount[0].count, 10) ===
        this.airdropDataMerchTransaction.length
          ? "OK"
          : "Failed"
      }
        `
    );
  };

  private seedMerchItem = async () => {
    await this.airdropRepo.query(`delete from item`);

    const promises = [];
    for (let i = 0; i < this.airdropDataMerchItem.length; i++) {
      const query = `insert into item ("merch_item","description","name") values (
            '${this.airdropDataMerchItem[i].merch_item}',
            '${this.airdropDataMerchItem[i].description}',
            '${this.airdropDataMerchItem[i].name}');`;
      // LoggerService.log(query);
      promises.push(this.airdropRepo.query(query));
    }
    await Promise.all(promises);

    const airdropCount = await this.airdropRepo.query(
      `select count(*) from item `
    );
    LoggerService.log(
      `Check airdrop merch item : ${
        parseInt(airdropCount[0].count, 10) === this.airdropDataMerchItem.length
          ? "OK"
          : "Failed"
      }
        `
    );
  };

  async seedMerch() {
    await Promise.all([this.seedMerchItem(), this.seedMerchTransaction()]);
  }
}
