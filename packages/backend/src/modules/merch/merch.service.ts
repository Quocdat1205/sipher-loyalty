import { Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "../logger/logger.service";

import { claimItem } from "./merch.type";

@Injectable()
export class MerchService {
  // constructor() {}

  async getAllMerch(publicAddress: string) {
    console.log(publicAddress);

    // LoggerService.log(`Get all merch`);
    // return this.merchRepo.find({ where: { publicAddress } });
  }

  // eslint-disable-next-line no-empty-pattern
  async claimItems({}: claimItem): Promise<HttpException | boolean> {
    LoggerService.log(`Claim merch`);

    return true;
  }
}
