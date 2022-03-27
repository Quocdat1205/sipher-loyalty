// import library
import fs from "fs";
import path from "path";

import { Repository } from "typeorm";
import { Airdrop, ImageUrl } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";

// import module
import { LoggerService } from "../logger/logger.service";

@Injectable()
export class SeedAirdropService {
  private src = path.resolve(__dirname, "../../../src/data");

  private airdropDataHolder = constant.isProduction
    ? JSON.parse(
        fs.readFileSync(`${this.src}/AIRDROP/TOKEN/holder.json`).toString()
      )
    : JSON.parse(
        fs.readFileSync(`${this.src}/AIRDROP/TOKEN/holder_test.json`).toString()
      );

  private airdropDataMerchTransaction = constant.isProduction
    ? JSON.parse(
        fs.readFileSync(`${this.src}/AIRDROP/MERCH/transaction.json`).toString()
      )
    : JSON.parse(
        fs
          .readFileSync(`${this.src}/AIRDROP/MERCH/transaction_test.json`)
          .toString()
      );

  constructor(
    @InjectRepository(Airdrop)
    private airdropRepo: Repository<Airdrop>,
    @InjectRepository(ImageUrl)
    private imageUrlRepo: Repository<ImageUrl>
  ) {}

  private seedToken = async (token) => {
    try {
      const imageUrl = await this.seedImageUrls(token.imageUrl);
      token.imageUrl = imageUrl;
      const _token = this.airdropRepo.create(token);
      await this.airdropRepo.save(_token);
    } catch (err) {
      LoggerService.error(err);
    }
  };

  private seedImageUrl = async (imageUrl) => {
    try {
      const _imageUrl = this.imageUrlRepo.create(imageUrl);
      const result = await this.imageUrlRepo.save(_imageUrl);
      return result;
    } catch (err) {
      LoggerService.error(err);
      return {};
    }
  };

  private seedImageUrls = async (imageUrls) => {
    const promises = [];
    for (let i = 0; i < imageUrls.length; i++) {
      promises.push(this.seedImageUrl(imageUrls[i]));
    }
    return Promise.all(promises);
  };

  seedTokens = async () => {
    await this.imageUrlRepo.query(`delete from image_url`);
    await this.airdropRepo.query(`delete from airdrop`);

    const tokenData = this.airdropDataHolder.data.map((el) => ({
      merkleRoot: this.airdropDataHolder.merkleRoot,
      imageUrl: this.airdropDataHolder.imageUrl,
      ...el,
      addressContract: this.airdropDataHolder.addressContract,
      startTime: this.airdropDataHolder.startTime,
      vestingInterval: this.airdropDataHolder.vestingInterval,
      numberOfVestingPoint: this.airdropDataHolder.numberOfVestingPoint,
      name: this.airdropDataHolder.name,
      description: this.airdropDataHolder.description,
      type: "TOKEN",
    }));
    await this.airdropRepo.query(
      `delete from airdrop where "addressContract"='${this.airdropDataHolder.addressContract}';`
    );

    const promises = [];
    for (let i = 0; i < tokenData.length; i++) {
      promises.push(this.seedToken(tokenData[i]));
    }
    await Promise.all(promises);
    LoggerService.log("Done");
  };
}
