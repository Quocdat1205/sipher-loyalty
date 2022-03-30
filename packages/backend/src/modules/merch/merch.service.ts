import { Repository } from "typeorm";
import { AirdropType, Item, Merchandise, SculptureTransaction } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "../logger/logger.service";

import { MerchUpdateDto } from "./merch.dto";

@Injectable()
export class MerchService {
  constructor(
    @InjectRepository(Merchandise)
    private merchRepo: Repository<Merchandise>,
    @InjectRepository(Item)
    private itemRepo: Repository<Item>
  ) {}

  async updateMerch(merchId: number, merchInfo: MerchUpdateDto) {
    const merch = await this.merchRepo.findOne(merchId);
    if (!merch) {
      throw new HttpException("Merch not found", HttpStatus.NOT_FOUND);
    }
    if (merchInfo.itemId !== undefined) {
      const item = await this.itemRepo.findOne(merchInfo.itemId);
      if (!item) {
        throw new HttpException("Item not found", HttpStatus.NOT_FOUND);
      }
      merch.item = item;
    }
    merch.shippable = merchInfo.shippable;
    merch.isShipped = merchInfo.isShipped;
    merch.merchItem = merchInfo.merchItem;
    merch.publicAddress = merchInfo.publicAddress;
    merch.quantity = merchInfo.quantity;
    merch.quantityShipped = merchInfo.quantityShipped;
    merch.tier = merchInfo.tier;
    /* 
      Apparently TypeORM doesn't return the whole updated item like other ORM, 
      have to do another find query after save() if needed. Return nothing for now
    */
    await this.merchRepo.save(merch);
  }

  async getAllMerchByPublicAddress(
    publicAddress: string
  ): Promise<Array<Merchandise> | undefined> {
    LoggerService.log(`Get all merch of publicAddress: ${publicAddress}`);

    const merchandises = await this.merchRepo.find({
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
    LoggerService.log(`Get all other of publicAddress: ${publicAddress}`);

    const others = await this.merchRepo.find({
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

  async getOtherAndMerchById(id: string): Promise<Merchandise> | undefined {
    LoggerService.log(`Get merch id: ${id}`);

    const other = await this.merchRepo.findOne({
      relations: ["item", "item.imageUrls"],
      where: { id },
    });

    if (!other) {
      throw new HttpException("List other not found", HttpStatus.NOT_FOUND);
    }
    return other;
  }
}
