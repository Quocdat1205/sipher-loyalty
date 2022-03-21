// import library
import fs from "fs";

import { Repository } from "typeorm";
import { Merch } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Airdrop } from "src/entity/airdrop.entity";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedAirdropService {
  private airdropDataHolder = JSON.parse(
    fs.readFileSync("./src/data/AIRDROP/Holder.json").toString()
  );

  private airdropDataInvestorsCP1 = JSON.parse(
    fs.readFileSync("./src/data/AIRDROP/investors_CP1.json").toString()
  );

  private airdropDataMerch = JSON.parse(
    fs.readFileSync("./src/data/AIRDROP/merch.json").toString()
  );

  constructor(
    @InjectRepository(Airdrop)
    private airdropRepo: Repository<Airdrop>,
    @InjectRepository(Merch)
    private merchRepo: Repository<Merch>
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
    }));
    await this.airdropRepo.query(
      `delete from airdrop where "addressContract"='${this.airdropDataHolder.addressContract}';`
    );

    const promises = [];
    for (let i = 0; i < flaternAirdrop.length; i++) {
      const query = `insert into airdrop ("merkleRoot","imageUrl","proof","leaf","claimer","addressContract","totalAmount","startTime","vestingInterval","numberOfVestingPoint","type") values (
            '${flaternAirdrop[i].merkleRoot}',
            '${flaternAirdrop[i].imageUrl}',
            '${`{${flaternAirdrop[i].proof.join(",")}}`}',
            '${flaternAirdrop[i].leaf}',
            '${flaternAirdrop[i].claimer.toLowerCase()}',
            '${flaternAirdrop[i].addressContract}',
            '${flaternAirdrop[i].totalAmount}',
            '${flaternAirdrop[i].startTime}',
            '${flaternAirdrop[i].vestingInterval}',
            '${flaternAirdrop[i].numberOfVestingPoint}'
            ,'TOKEN');`;
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

  seedAirdropInvestor_CP1 = async () => {
    const flaternAirdrop = this.airdropDataInvestorsCP1.data.map((el) => ({
      merkleRoot: this.airdropDataInvestorsCP1.merkleRoot,
      imageUrl: this.airdropDataInvestorsCP1.imageUrl,
      ...el,
      addressContract: this.airdropDataInvestorsCP1.addressContract,
      startTime: this.airdropDataInvestorsCP1.startTime,
      vestingInterval: this.airdropDataInvestorsCP1.vestingInterval,
      numberOfVestingPoint: this.airdropDataInvestorsCP1.numberOfVestingPoint,
    }));
    await this.airdropRepo.query(
      `delete from airdrop where "addressContract"='${this.airdropDataInvestorsCP1.addressContract}';`
    );

    const promises = [];
    for (let i = 0; i < flaternAirdrop.length; i++) {
      const query = `insert into airdrop ("merkleRoot","imageUrl","proof","leaf","claimer","addressContract","totalAmount","startTime","vestingInterval","numberOfVestingPoint","type") values (
            '${flaternAirdrop[i].merkleRoot}',
            '${flaternAirdrop[i].imageUrl}',
            '${`{${flaternAirdrop[i].proof.join(",")}}`}',
            '${flaternAirdrop[i].leaf}',
            '${flaternAirdrop[i].claimer.toLowerCase()}',
            '${flaternAirdrop[i].addressContract}',
            '${flaternAirdrop[i].totalAmount}',
            '${flaternAirdrop[i].startTime}',
            '${flaternAirdrop[i].vestingInterval}',
            '${flaternAirdrop[i].numberOfVestingPoint}'
            ,'TOKEN');`;
      // LoggerService.log(query);
      promises.push(this.airdropRepo.query(query));
    }
    await Promise.all(promises);

    const airdropCount = await this.airdropRepo.query(
      `select count(*) from airdrop where "addressContract"='${this.airdropDataInvestorsCP1.addressContract}';`
    );
    LoggerService.log(
      `Check airdrop investors campaign 1: ${
        parseInt(airdropCount[0].count, 10) === flaternAirdrop.length
          ? "OK"
          : "Failed"
      }
        `
    );
  };

  private async upsertMerch(_merch: Merch): Promise<Merch | null> {
    LoggerService.log(`upsert merch`);
    return this.merchRepo.save(_merch);
  }

  seedAirdropMerch = async () => {
    await this.merchRepo.query(`delete from merch`);

    const promises = [];
    for (let i = 0; i < this.airdropDataMerch.length; i++) {
      promises.push(this.upsertMerch(this.airdropDataMerch[i]));
    }
    await Promise.all(promises);

    const airdropCount = await this.merchRepo.query(
      `select count(*) from merch;`
    );
    LoggerService.log(
      `Check airdrop Holder : ${
        parseInt(airdropCount[0].count, 10) === this.airdropDataMerch.length
          ? "OK"
          : "Failed"
      }
        `
    );
  };
}
