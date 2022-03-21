import { Repository } from "typeorm";
import { Merch } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "../logger/logger.service";

import { claimItem, merch } from "./merch.type";

@Injectable()
export class MerchService {
  constructor(@InjectRepository(Merch) private merchRepo: Repository<Merch>) {}

  async getAllMerch(wallet_address: string): Promise<merch | null> {
    LoggerService.log(`Get all merch`);

    return this.merchRepo.findOne({ where: { wallet_address } });
  }

  async claimItems({
    wallet_address,
    id_merch,
  }: claimItem): Promise<HttpException | boolean> {
    LoggerService.log(`Claim merch`);

    try {
      // find wallet address and items
      const item = await this.merchRepo.findOne({
        where: { wallet_address, id_merch },
      });

      if (!item) {
        throw new HttpException("Item not found", HttpStatus.NOT_FOUND);
      }

      item.isClaim = true;

      return true;
    } catch (error) {
      throw new HttpException(
        "Something went wrong, please try again!",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
