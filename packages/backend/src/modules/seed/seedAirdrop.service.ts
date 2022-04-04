// import library
import fs from "fs";
import path from "path";

import { BigNumber, ethers } from "ethers";
import { Repository } from "typeorm";
import { Airdrop, ImageUrl, Item, Merchandise } from "@entity";
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

  private airdropDataMerchandise = constant.isProduction
    ? JSON.parse(
        fs.readFileSync(`${this.src}/AIRDROP/MERCH/merch.json`).toString()
      )
    : JSON.parse(
        fs.readFileSync(`${this.src}/AIRDROP/MERCH/merch_test.json`).toString()
      );

  private airdropDataCard = constant.isProduction
    ? JSON.parse(
        fs.readFileSync(`${this.src}/AIRDROP/CARD/data.json`).toString()
      )
    : JSON.parse(
        fs.readFileSync(`${this.src}/AIRDROP/CARD/data_test.json`).toString()
      );

  private airdropDataMerchItem = JSON.parse(
    fs.readFileSync(`${this.src}/AIRDROP/MERCH/item.json`).toString()
  );

  constructor(
    @InjectRepository(Airdrop)
    private airdropRepo: Repository<Airdrop>,
    @InjectRepository(ImageUrl)
    private imageUrlRepo: Repository<ImageUrl>,
    @InjectRepository(Merchandise)
    private merchRepo: Repository<Merchandise>,
    @InjectRepository(Item)
    private itemRepo: Repository<Item>
  ) {}

  async clear() {
    await this.imageUrlRepo.query(`delete from image_url`);
    await this.merchRepo.query(`delete from merchandise`);
    await this.itemRepo.query(`delete from item`);
    await this.airdropRepo.query(
      `delete from airdrop where "addressContract"='${this.airdropDataHolder.addressContract.toLowerCase()}';`
    );
  }

  private seedToken = async (token: Airdrop, imagesUrl: ImageUrl[]) => {
    try {
      token.imageUrls = imagesUrl;
      token.claimer = token.claimer.toLowerCase();
      const _token = this.airdropRepo.create(token);
      await this.airdropRepo.save(_token);
      LoggerService.log(`add token for ${token.claimer} success`);
    } catch (err) {
      LoggerService.error(err);
    }
  };

  private seedImageUrl = async (imageUrl: ImageUrl) => {
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
    const a = await Promise.all(promises);
    return a;
  };

  private weiToEther = (wei: string | BigNumber) =>
    parseFloat(ethers.utils.formatEther(wei));

  private currency = (
    amount: number,
    prefix = "",
    options: {
      maximumFractionDigits?: number;
      minimumFractionDigits?: number;
    } = {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }
  ) => prefix + amount.toLocaleString(undefined, { ...options });

  seedTokens = async () => {
    const tokenData = this.airdropDataHolder.data.map((el) => ({
      merkleRoot: this.airdropDataHolder.merkleRoot,
      ...el,
      addressContract: this.airdropDataHolder.addressContract.toLowerCase(),
      startTime: this.airdropDataHolder.startTime,
      vestingInterval: this.airdropDataHolder.vestingInterval,
      numberOfVestingPoint: this.airdropDataHolder.numberOfVestingPoint,
      name: this.airdropDataHolder.name,
      shortDescription: this.airdropDataHolder.shortDescription,
      description: [
        `${this.currency(
          this.weiToEther(el.totalAmount)
        )} $SIPHER Token(s) Airdrop`,
        `Over a ${
          this.airdropDataHolder.numberOfVestingPoint
        } month Vesting Period with each month getting ${this.currency(
          this.weiToEther(el.totalAmount) /
            this.airdropDataHolder.numberOfVestingPoint
        )} $SIPHER starting on March 01 2022.`,
      ],
      type: "TOKEN",
    }));

    const imageUrls = await this.seedImageUrls(
      this.airdropDataHolder.imageUrls
    );

    const promises = [];
    for (let i = 0; i < tokenData.length; i++) {
      promises.push(this.seedToken(tokenData[i], imageUrls));
    }
    await Promise.all(promises);

    LoggerService.log("Done token");
  };

  private seedItem = async (item: Item) => {
    try {
      const imageUrl = await this.seedImageUrls(item.imageUrls);
      item.imageUrls = imageUrl;
      item.merchandise = await this.merchRepo.find({
        merchItem: item.merchItem,
      });

      const _item = this.itemRepo.create(item);
      await this.itemRepo.save(_item);
    } catch (err) {
      LoggerService.error(err);
    }
  };

  seedItems = async () => {
    const promises = [];
    for (let i = 0; i < this.airdropDataMerchItem.length; i++) {
      promises.push(this.seedItem(this.airdropDataMerchItem[i]));
    }
    await Promise.all(promises);
    LoggerService.log("Done item");
  };

  private seedMerch = async (merch) => {
    try {
      merch.publicAddress = merch.publicAddress.toLowerCase();
      const _merch = this.merchRepo.create(merch);
      await this.merchRepo.save(_merch);
    } catch (err) {
      LoggerService.error(JSON.stringify(err));
    }
  };

  seedMerchs = async () => {
    const promises = [];
    for (let i = 0; i < this.airdropDataMerchandise.length; i++) {
      promises.push(this.seedMerch(this.airdropDataMerchandise[i]));
    }

    for (let i = 0; i < this.airdropDataCard.length; i++) {
      promises.push(this.seedMerch(this.airdropDataCard[i]));
    }
    await Promise.all(promises);
    LoggerService.log("Done merch");
  };
}
