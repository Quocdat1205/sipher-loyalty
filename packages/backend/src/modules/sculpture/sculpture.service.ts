import { ShopifyCode, ShopifyCodeStatus } from "@entity";
import { MultiTokenService } from "@modules/multi-token/multi-token.service";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";
import { Repository } from "typeorm";
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
      constant.SCULPTURE_ADDRESS,
      {
        address: sculptureBalanceDto.address,
        tokenId: this.sculptureMap[sculptureBalanceDto.sculptureType],
      }
    );
    return balance;
  }

  async redeemShopifyCode(redeemShopifyCodeDto: RedeemShopifyCodeDto) {
    const { amount, tokenId, address, txHash } = redeemShopifyCodeDto;
    const existed = await this.shopifyCodeRepo.findOne({
      where: {
        txHash: txHash,
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
    for (const code of codeToRedeem) {
      console.log(`Redeeem ${code.code}`);
      code.status = ShopifyCodeStatus.REDEEMED;
      code.tokenId = tokenId;
      code.ownerAddress = address;
      code.txHash = txHash;
      this.shopifyCodeRepo.save(code);
    }
  }
}
