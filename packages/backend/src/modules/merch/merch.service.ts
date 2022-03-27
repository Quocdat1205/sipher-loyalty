import { Repository } from "typeorm";
import { AirdropType, Merchandise, SculptureTransaction } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "../logger/logger.service";

@Injectable()
export class MerchService {
  constructor(
    @InjectRepository(Merchandise)
    private merchListRepo: Repository<Merchandise>,
    @InjectRepository(SculptureTransaction)
    private sculptureTransactionRepo: Repository<SculptureTransaction>
  ) {}

  async getAllMerchByPublicAddress(
    publicAddress: string
  ): Promise<Array<Merchandise> | undefined> {
    LoggerService.log(`Get all merch`);

    const merchandises = await this.merchListRepo.find({
      relations: ["item", "item.imageUrls"],
      where: [
        {
          publicAddress,
          item: {
            type: AirdropType.MERCH,
          },
        },
      ],
    });

    if (!merchandises) {
      throw new HttpException("List merch not found", HttpStatus.NOT_FOUND);
    }
    return merchandises;
  }

  async getOtherMerchByPublicAddress(
    publicAddress: string
  ): Promise<Array<Merchandise> | undefined> {
    LoggerService.log(`Get all other`);

    const others = await this.merchListRepo.find({
      relations: ["item", "item.imageUrls"],
      where: [
        {
          publicAddress,
          item: {
            type: AirdropType.OTHER,
          },
        },
      ],
    });

    if (!others) {
      throw new HttpException("List other not found", HttpStatus.NOT_FOUND);
    }
    return others;
  }
}
