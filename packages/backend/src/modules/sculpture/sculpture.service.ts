import { Repository } from "typeorm";
import { SculptureTransaction } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { LoggerService } from "@modules/logger/logger.service";

import { RedeemTxDto } from "./sculpture.dto";

@Injectable()
export class SculptureService {
  constructor(
    @InjectRepository(SculptureTransaction)
    private sculptureTxRepo: Repository<SculptureTransaction>
  ) {}
  /**
   * Get transactions from an address
   * @param {string} address ethereum address
   * @returns transactions of the address
   */
  async getAddressTx(address: string) {
    const transactions = await this.sculptureTxRepo.find({
      where: {
        ownerAddress: address,
      },
    });
    return transactions;
  }
  /**
   * Save redeem transaction
   * @param {RedeemTxDto} redeemShopifyCodeDto dto of a redeem transaction
   * @returns newly saved redeem transaction
   */
  async saveRedeemTransaction(redeemShopifyCodeDto: RedeemTxDto) {
    const { amount, tokenId, address, txHash } = redeemShopifyCodeDto;
    const existed = await this.sculptureTxRepo.findOne({
      where: {
        id: txHash,
      },
    });
    if (existed) {
      return;
    }

    const newTransaction = new SculptureTransaction();
    newTransaction.event = "RedeemRecord";
    newTransaction.id = txHash;
    newTransaction.amount = amount;
    newTransaction.tokenId = tokenId;
    newTransaction.ownerAddress = address;
    LoggerService.debug(
      `Saving sculpture transactions: ${JSON.stringify(newTransaction)}`
    );
    await this.sculptureTxRepo.save(newTransaction);
  }
}
