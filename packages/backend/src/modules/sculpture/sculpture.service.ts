import { Repository } from "typeorm";
import { SculptureTransaction } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";
import { MultiTokenService } from "@modules/multi-token/multi-token.service";

import {
  RedeemTxDto,
  SculptureBalanceDto,
  SculptureType,
} from "./sculpture.dto";

@Injectable()
export class SculptureService {
  private sculptureMap: { [K in SculptureType]: string } = {
    inu: "1",
    neko: "2",
  };

  constructor(
    private multiTokenService: MultiTokenService,
    @InjectRepository(SculptureTransaction)
    private sculptureTxRepo: Repository<SculptureTransaction>
  ) {}

  async sculptureBalance(sculptureBalanceDto: SculptureBalanceDto) {
    const balance = await this.multiTokenService.balanceOf(
      constant.blockchain.contracts.erc1155Sculpture[constant.CHAIN_ID].address,
      {
        address: sculptureBalanceDto.address,
        tokenId: this.sculptureMap[sculptureBalanceDto.sculptureType],
      }
    );
    return balance;
  }

  async getAddressTx(address: string) {
    const transactions = await this.sculptureTxRepo.find({
      where: {
        ownerAddress: address,
      },
    });
    if (!transactions) {
      return [];
    }
    return transactions;
  }

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
