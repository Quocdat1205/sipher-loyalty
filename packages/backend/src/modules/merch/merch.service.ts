import { Repository } from "typeorm";
import { Item, Transaction } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "../logger/logger.service";

import { claimItem } from "./merch.type";

@Injectable()
export class MerchService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>
  ) {}

  async getAllMerch(publicAddress: string) {
    LoggerService.log(`Get all merch`);

    // const result = await this.transactionRepo
    //   .createQueryBuilder("transaction")
    //   .innerJoin("transaction.publicAddress", "item.publicAddress")
    //   .where("transaction.publicAddress = :publicAddress", { publicAddress })
    //   .getRawMany();

    const result = await this.transactionRepo.findOne({
      // join: {
      //   alias: "transaction",
      //   innerJoin: {
      //     publicAddress: "item.publicAddress",
      //   },
      // },
      where: { publicAddress },
      relations: ["item"],
    });

    // return this.transactionRepo.find({ where: { publicAddress } });
  }

  // eslint-disable-next-line no-empty-pattern
  async claimItems({}: claimItem): Promise<HttpException | boolean> {
    LoggerService.log(`Claim merch`);

    return true;
  }
}
