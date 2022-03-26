import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import {
  Address,
  Item,
  ItemOrder,
  Order,
  Receiver,
  Transaction,
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
import { allMerchType, receiverType } from "./response.type";

@Injectable()
export class MerchService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
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

  async getAllMerch(
    publicAddress: string
  ): Promise<Array<allMerchType> | undefined> {
    LoggerService.log(`Get all merch`);

    const transaction = await this.transactionRepo.find({
      where: { publicAddress },
    });

    if (!transaction) {
      throw new HttpException("List merch not found", HttpStatus.NOT_FOUND);
    }

    const { length } = transaction;
    const response: Array<allMerchType> = [];
    for (let i = 0; i < length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const item = await this.itemRepo.findOne({
        where: { merch_item: transaction[i].merch_item },
      });

      response.push({
        id_transaction: transaction[i].id_transaction,
        publicAddress: transaction[i].publicAddress,
        tier: transaction[i].tier,
        merch_item: transaction[i].merch_item,
        quantity: transaction[i].quantity,
        quantity_shipped: transaction[i].quantity_shipped,
        isShipped: transaction[i].isShipped,
        view: item.view,
      });
    }

    return response;
  }

  async addNewReceriver(
    info: shipping_info
  ): Promise<receiverType | undefined> {
    const { publicAddress, first_name, last_name, email, phone } = info;

    return this.receiverRepo.create({
      id_receiver: uuidv4(),
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
      id_address: uuidv4(),
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
      const id_order = uuidv4();

      // insert new Order
      this.orderRepo.create({
        id_order,
        publicAddress,
        id_address,
        id_receiver,
      });

      // imsert list item order
      const { length } = list_item_order;

      for (let i = 0; i < length; i++) {
        this.itemOrderRepo.create({
          id_order,
          size: list_item_order[i].size,
          color: list_item_order[i].color,
          quantity: list_item_order[i].quantity,
          id_transaction: list_item_order[i].id_transaction,
        });

        // update quantity transaction
        // eslint-disable-next-line no-await-in-loop
        const transaction = await this.transactionRepo.findOne({
          where: { id_transaction: list_item_order[i].id_transaction },
        });

        transaction.quantity -= list_item_order[i].quantity;
        transaction.quantity_shipped += list_item_order[i].quantity;

        if (transaction.quantity - list_item_order[i].quantity === 0) {
          transaction.isShipped = true;
        }

        // eslint-disable-next-line no-await-in-loop
        await this.transactionRepo.save(transaction);
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
      const transaction = await this.transactionRepo.findOne({
        where: { id_transaction: list_item[i].id_transaction },
      });

      if (list_item[i].quantity > transaction.quantity) {
        return false;
      }
    }

    return true;
  }

  // async redeemMerch(
  //   redeem_merch: redeemMerchType
  // ): Promise<HttpException | boolean> {
  //   LoggerService.log(`Redeem merch`);

  //   const { publicAddress, info, address, list_merch } = redeem_merch;

  //   // find publicAddress
  //   const user = await this.transactionRepo.findOne({
  //     where: { publicAddress },
  //   });

  //   if (!user) {
  //     throw new HttpException("Address not found", HttpStatus.NOT_FOUND);
  //   }

  //   // check quantity item
  //   const { length } = list_merch;
  //   for (let i = 0; i < length; i++) {
  //     // eslint-disable-next-line no-await-in-loop
  //     const check = await this.transactionRepo.findOne({
  //       where: { publicAddress, merch_item: list_merch[i].merch_item },
  //     });

  //     if (!check) {
  //       throw new HttpException("Item not found", HttpStatus.NOT_FOUND);
  //     }

  //     if (check.quantity < list_merch[i].quantity) {
  //       throw new HttpException(
  //         `Quantity ${check.merch_item} is not enough`,
  //         HttpStatus.FORBIDDEN
  //       );
  //     }
  //   }

  //   return true;
  // }
}
