// import library

import { Repository } from "typeorm";
import { Canceled, CancelType } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "../logger/logger.service";

@Injectable()
export class CancelService {
  constructor(
    @InjectRepository(Canceled)
    private canceledRepo: Repository<Canceled>
  ) {}

  getCanceled = async (signature: string, type: CancelType) => {
    const canceled = await this.canceledRepo.findOne({
      signature,
      type,
    });
    return canceled;
  };

  async updateCanceled(canceled: Canceled) {
    LoggerService.log(`update canceled batch: ${JSON.stringify(canceled)}`);
    return this.canceledRepo.save(canceled);
  }

  async createCanceled(canceled: Canceled) {
    LoggerService.log(`create canceled : ${JSON.stringify(canceled)}`);
    return this.canceledRepo.save(canceled);
  }

  async getDataCancelTableForAdmin(from: number, take: number) {
    const data = await this.canceledRepo.find({
      skip: from,
      take,
    });
    return { total: data.length, data };
  }
}
