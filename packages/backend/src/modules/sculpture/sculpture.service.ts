import { Repository } from "typeorm";
import { ShopifyCode, ShopifyCodeStatus } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";

import { LoggerService } from "@modules/logger/logger.service";
import { MultiTokenService } from "@modules/multi-token/multi-token.service";

import {
  RedeemShopifyCodeDto,
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
    @InjectRepository(ShopifyCode)
    private shopifyCodeRepo: Repository<ShopifyCode>
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

  async getAddressOwnedCode(address: string) {
    const shopifycodes = await this.shopifyCodeRepo.find({
      where: {
        ownerAddress: address,
      },
    });
    if (!shopifycodes) {
      return [];
    }
    return shopifycodes;
  }

  async redeemShopifyCode(redeemShopifyCodeDto: RedeemShopifyCodeDto) {
    const { amount, tokenId, address, txHash } = redeemShopifyCodeDto;
    const existed = await this.shopifyCodeRepo.findOne({
      where: {
        txHash,
      },
    });
    if (existed) {
      return;
    }
    const codeToRedeem = await this.shopifyCodeRepo
      .createQueryBuilder("shopify_code")
      .where("status = :status", {
        status: ShopifyCodeStatus.AVAILABLE,
      })
      .limit(amount)
      .printSql()
      .getMany();
    // eslint-disable-next-line no-restricted-syntax
    for (const code of codeToRedeem) {
      LoggerService.log(`Redeeem ${code.code}`);
      code.status = ShopifyCodeStatus.REDEEMED;
      code.tokenId = tokenId;
      code.ownerAddress = address;
      code.txHash = txHash;
      this.shopifyCodeRepo.save(code);
    }
  }
}
