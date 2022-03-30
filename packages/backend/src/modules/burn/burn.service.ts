// import library

import { Repository } from "typeorm";
import { Burned, BurnType } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { BatchOrder, Order } from "@utils/type";

import { LoggerService } from "../logger/logger.service";

@Injectable()
export class BurnService {
  constructor(
    @InjectRepository(Burned)
    private burnedRepo: Repository<Burned>
  ) {}

  getBurnedSingle = async (order: Order, type: BurnType) => {
    const burned = await this.burnedRepo.findOne({
      where: [
        {
          to: order.to.toLowerCase(),
          type,
          salt: order.salt,
          batchID: order.batchID,
          amount: order.amount,
          batchIDs: [],
          amounts: [],
        },
      ],
    });
    return burned;
  };

  getBurnedBatchOrder = async (batchOrder: BatchOrder, type: BurnType) => {
    const burneds = await this.burnedRepo.findOne({
      where: [
        {
          to: batchOrder.to.toLowerCase(),
          type,
          salt: batchOrder.salt,
          batchIDs: batchOrder.batchID,
          amounts: batchOrder.amount,
        },
      ],
    });
    return burneds;
  };

  async updateBurned(burned: Burned) {
    LoggerService.log(`update burned batch: ${JSON.stringify(burned)}`);
    return this.burnedRepo.save(burned);
  }

  async createBurned(burned: Burned) {
    LoggerService.log(`create burned : ${JSON.stringify(burned)}`);
    return this.burnedRepo.save(burned);
  }
}
