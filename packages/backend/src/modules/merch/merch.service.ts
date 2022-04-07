import _ from "lodash";
import { In, Repository } from "typeorm";
import { AirdropType, Item, ItemType, Merchandise } from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserData } from "@modules/auth/auth.types";

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

  async getDataMerchTableForAdmin(from: number, take: number) {
    const data = await this.merchRepo.find({
      relations: ["item", "item.imageUrls"],
      skip: from,
      take,
    });
    return { total: data.length, data };
  }

  async updateDataMerchTableForAdmin(merchandise: Merchandise) {
    return this.merchRepo.save(merchandise);
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

  async getAllMerchByUserId(
    userData: UserData
  ): Promise<Array<Merchandise> | undefined> {
    LoggerService.log(`Get all merch of user id: ${userData.userId}`);

    const merchandises = await this.merchRepo.find({
      relations: ["item", "item.imageUrls"],
      where: [
        {
          publicAddress: In(userData.publicAddress),
          item: {
            type: AirdropType.MERCH,
          },
        },
      ],
    });
    if (!merchandises || merchandises.length < 1) {
      throw new HttpException("List merch not found", HttpStatus.NOT_FOUND);
    }
    const merchGrouped = _.groupBy(merchandises, "merchItem");

    const merchs: Merchandise[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const itemType of Object.values(ItemType)) {
      let quantity = 0;
      let quantityShipped = 0;
      if (merchGrouped[itemType]) {
        quantity = merchGrouped[itemType].reduce(
          (prev, curr) => prev + curr.quantity,
          0
        );
        quantityShipped = merchGrouped[itemType].reduce(
          (prev, curr) => prev + curr.quantityShipped,
          0
        );
      }
      if (merchGrouped[itemType] && merchGrouped[itemType].length > 0)
        merchs.push({
          ...merchGrouped[itemType][0],
          quantity,
          quantityShipped,
        });
    }
    return merchs;
  }

  async getAllOtherMerchByPublicAddress(
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

  async getAllOtherMerchByUserId(
    userData: UserData
  ): Promise<Array<Merchandise> | undefined> {
    LoggerService.log(`Get all other of user id: ${userData.userId}`);

    const others = await this.merchRepo.find({
      relations: ["item", "item.imageUrls"],
      where: [
        {
          publicAddress: In(userData.publicAddress),
          item: {
            type: AirdropType.OTHER,
          },
        },
      ],
    });

    if (!others) {
      throw new HttpException("List other not found", HttpStatus.NOT_FOUND);
    }

    const othersGrouped = _.groupBy(others, "merchItem");

    const othersResult: Merchandise[] = [];
    for (const itemType of Object.values(ItemType)) {
      if (othersGrouped[itemType] && othersGrouped[itemType].length > 0)
        othersResult.push({
          ...othersGrouped[itemType][0],
          quantity: 1,
          quantityShipped: 0,
        });
    }
    return othersResult;
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

  async getOtherAndMerchByIdAndUserId(
    id: string,
    userData: UserData
  ): Promise<Merchandise> | undefined {
    LoggerService.log(`Get merch id by UserData: ${userData.userId}`);

    const other = await this.merchRepo.findOne({
      relations: ["item", "item.imageUrls"],
      where: { id },
    });

    const merchandises = await this.merchRepo.find({
      relations: ["item", "item.imageUrls"],
      where: [
        {
          publicAddress: In(userData.publicAddress),
          item: {
            type: AirdropType.MERCH,
          },
          merchItem: other.merchItem,
        },
      ],
    });
    const quantity = merchandises.reduce(
      (prev, curr) => prev + curr.quantity,
      0
    );
    const quantityShipped = merchandises.reduce(
      (prev, curr) => prev + curr.quantityShipped,
      0
    );

    if (!other) {
      throw new HttpException("List other not found", HttpStatus.NOT_FOUND);
    }
    return { ...other, quantity, quantityShipped };
  }
}
