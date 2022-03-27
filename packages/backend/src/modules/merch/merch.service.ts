import { Repository } from "typeorm";
import {
  Address,
  Airdrop,
  AirdropType,
  Item,
  ItemOrder,
  MerchList,
  Order,
  Receiver,
} from "@entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "../logger/logger.service";

import {
  itemOrder,
  ordertype,
  shipping_address,
  shipping_info,
} from "./merch.type";
import { MerchType, ReceiverType } from "./response.type";

@Injectable()
export class MerchService {
  constructor(
    @InjectRepository(MerchList)
    private merchListRepo: Repository<MerchList>,
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
    @InjectRepository(Receiver)
    private receiverRepo: Repository<Receiver>,
    @InjectRepository(Address)
    private addressRepo: Repository<Address>,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(ItemOrder)
    private itemOrderRepo: Repository<ItemOrder>
  ) {}

  async toMerchData(merchList: MerchList, type: AirdropType) {
    const item = await this.itemRepo.findOne({
      where: { merch_item: merchList.merch_item },
    });

    return {
      id_merch_list: merchList.id_merch_list,
      publicAddress: merchList.publicAddress,
      tier: merchList.tier,
      merch_item: merchList.merch_item,
      quantity: merchList.quantity,
      quantity_shipped: merchList.quantity_shipped,
      isShipped: merchList.isShipped,
      name: item.name,
      description: item.description,
      imageUrls: item.imageUrls,
      type,
    };
  }

  async getAllMerchByPublicAddress(
    publicAddress: string
  ): Promise<Array<MerchType> | undefined> {
    LoggerService.log(`Get all merch`);

    const merchLists = await this.merchListRepo.find({
      where: { publicAddress, isShip: true },
    });

    if (!merchLists) {
      throw new HttpException("List merch not found", HttpStatus.NOT_FOUND);
    }

    const response: Array<MerchType> = await Promise.all(
      merchLists.map(async (merchList) =>
        this.toMerchData(merchList, AirdropType.MERCH)
      )
    );

    return response;
  }

  async getOtherMerchByPublicAddress(
    publicAddress: string
  ): Promise<Array<MerchType> | undefined> {
    LoggerService.log(`Get all merch`);

    const merchLists = await this.merchListRepo.find({
      where: { publicAddress, isShip: false },
    });

    if (!merchLists) {
      throw new HttpException("List merch not found", HttpStatus.NOT_FOUND);
    }

    const response: Array<MerchType> = await Promise.all(
      merchLists.map(async (merchList) =>
        this.toMerchData(merchList, AirdropType.OTHER)
      )
    );

    return response;
  }

  async addNewReceriver(
    info: shipping_info
  ): Promise<ReceiverType | undefined> {
    const { publicAddress, first_name, last_name, email, phone } = info;

    return this.receiverRepo.create({
      publicAddress,
      first_name,
      last_name,
      email,
      phone,
    });
  }

  async addNewAddress(address: shipping_address) {
    const { publicAddress, street_address, town, state, country, zip_code } =
      address;

    return this.addressRepo.create({
      publicAddress,
      street_address,
      town,
      state,
      country,
      zip_code,
    });
  }

  async findAllAddress(id_address: string): Promise<Address> {
    return this.addressRepo.findOne({ where: { id_address } });
  }

  async findAllReceiver(id_receiver: string): Promise<Receiver> {
    return this.receiverRepo.findOne({ where: { id_receiver } });
  }

  async addNewOrder(order: ordertype): Promise<HttpException | boolean> {
    try {
      const { publicAddress, id_address, id_receiver, list_item_order } = order;

      // insert new Order
      this.orderRepo.create({
        publicAddress,
        id_address,
        id_receiver,
      });

      // imsert list item order
      const { length } = list_item_order;

      for (let i = 0; i < length; i++) {
        this.itemOrderRepo.create({
          size: list_item_order[i].size,
          color: list_item_order[i].color,
          quantity: list_item_order[i].quantity,
          id_merch_list: list_item_order[i].id_merch_list,
        });

        // update quantity merchList
        // eslint-disable-next-line no-await-in-loop
        const merchList = await this.merchListRepo.findOne({
          where: { id_merch_list: list_item_order[i].id_merch_list },
        });

        merchList.quantity -= list_item_order[i].quantity;
        merchList.quantity_shipped += list_item_order[i].quantity;

        if (merchList.quantity - list_item_order[i].quantity === 0) {
          merchList.isShipped = true;
        }

        // eslint-disable-next-line no-await-in-loop
        await this.merchListRepo.save(merchList);
      }

      return true;
    } catch (error) {
      throw new HttpException(
        `Add new Order error ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async checkQuantity(list_item: Array<itemOrder>): Promise<boolean> {
    const { length } = list_item;

    for (let i = 0; i < length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const merchList = await this.merchListRepo.findOne({
        where: { id_merch_list: list_item[i].id_merch_list },
      });

      if (list_item[i].quantity > merchList.quantity) {
        return false;
      }
    }

    return true;
  }
}
