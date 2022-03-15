// import library
import fs from "fs";

import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Airdrop } from "src/entity/airdrop.entity";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedAirdropService {
  private airdropDataNFT = JSON.parse(
    fs.readFileSync("./src/data/AIRDROP/nft.json").toString()
  );

  private airdropDataInvestorsCP1 = JSON.parse(
    fs.readFileSync("./src/data/AIRDROP/investors_CP1.json").toString()
  );

  constructor(
    @InjectRepository(Airdrop)
    private airdropRepo: Repository<Airdrop>
  ) {}

  seedAirdropNFT = async () => {
    const flaternAirdrop = this.airdropDataNFT.data.map((el) => ({
      merkleRoot: this.airdropDataNFT.merkleRoot,
      ...el,
      campaignCode: this.airdropDataNFT.campaignCode,
      startTime: this.airdropDataNFT.startTime,
      vestingInterval: this.airdropDataNFT.vestingInterval,
      numberOfVestingPoint: this.airdropDataNFT.numberOfVestingPoint,
    }));
    await this.airdropRepo.query(
      `delete from airdrop where "campaignCode"='${this.airdropDataNFT.campaignCode}';`
    );

    const promises = [];
    for (let i = 0; i < flaternAirdrop.length; i++) {
      const query = `insert into airdrop ("merkleRoot","proof","leaf","claimer","campaignCode","totalAmount","startTime","vestingInterval","numberOfVestingPoint") values (
            '${flaternAirdrop[i].merkleRoot}',
            '${`{${flaternAirdrop[i].proof.join(",")}}`}',
            '${flaternAirdrop[i].leaf}',
            '${flaternAirdrop[i].claimer.toLowerCase()}',
            '${flaternAirdrop[i].campaignCode}',
            '${flaternAirdrop[i].totalAmount}',
            '${flaternAirdrop[i].startTime}',
            '${flaternAirdrop[i].vestingInterval}',
            '${flaternAirdrop[i].numberOfVestingPoint}');`;
      // LoggerService.log(query);
      promises.push(this.airdropRepo.query(query));
    }
    await Promise.all(promises);

    const airdropCount = await this.airdropRepo.query(
      `select count(*) from airdrop where "campaignCode"='${this.airdropDataNFT.campaignCode}';`
    );
    LoggerService.log(
      `Check airdrop nft : ${
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
      ...el,
      campaignCode: this.airdropDataInvestorsCP1.campaignCode,
      startTime: this.airdropDataInvestorsCP1.startTime,
      vestingInterval: this.airdropDataInvestorsCP1.vestingInterval,
      numberOfVestingPoint: this.airdropDataInvestorsCP1.numberOfVestingPoint,
    }));
    await this.airdropRepo.query(
      `delete from airdrop where "campaignCode"='${this.airdropDataInvestorsCP1.campaignCode}';`
    );

    const promises = [];
    for (let i = 0; i < flaternAirdrop.length; i++) {
      const query = `insert into airdrop ("merkleRoot","proof","leaf","claimer","campaignCode","totalAmount","startTime","vestingInterval","numberOfVestingPoint") values (
            '${flaternAirdrop[i].merkleRoot}',
            '${`{${flaternAirdrop[i].proof.join(",")}}`}',
            '${flaternAirdrop[i].leaf}',
            '${flaternAirdrop[i].claimer.toLowerCase()}',
            '${flaternAirdrop[i].campaignCode}',
            '${flaternAirdrop[i].totalAmount}',
            '${flaternAirdrop[i].startTime}',
            '${flaternAirdrop[i].vestingInterval}',
            '${flaternAirdrop[i].numberOfVestingPoint}');`;
      // LoggerService.log(query);
      promises.push(this.airdropRepo.query(query));
    }
    await Promise.all(promises);

    const airdropCount = await this.airdropRepo.query(
      `select count(*) from airdrop where "campaignCode"='${this.airdropDataInvestorsCP1.campaignCode}';`
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
}
