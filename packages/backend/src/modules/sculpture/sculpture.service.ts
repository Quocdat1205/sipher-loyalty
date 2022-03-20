import { getManager, getRepository, Repository } from "typeorm";
import { ShopifyCode, User } from "@entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import constant from "@setting/constant";

import { MultiTokenService } from "@modules/multi-token/multi-token.service";

import { SculptureBalanceDto } from "./sculpture.dto";

@Injectable()
export class SculptureService {
  constructor(
    private multiTokenService: MultiTokenService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(ShopifyCode)
    private shopifyCodeRepo: Repository<ShopifyCode>
  ) {}

  private async sculptureBalance(sculptureBalanceDto: SculptureBalanceDto) {
    const balance = await this.multiTokenService.balanceOf(
      constant.SCULPTURE_ADDRESS,
      sculptureBalanceDto
    );
    return balance;
  }

  private generateShopifyCodes(): string {
    return `YEET${Math.round(Math.random() * 10000)}`;
  }

  private async createShopifySculptureCode(
    ownerAddress: string,
    amount: number
  ) {
    if (amount <= 0) {
      return [];
    }
    const codes: string[] = [];
    const user = await this.userRepo.findOne(ownerAddress);
    if (!user) {
      // TODO: Should implement not found error later
      return [];
    }
    const promises = [];
    for (let i = 0; i < amount; i++) {
      const code = this.generateShopifyCodes();
      codes.push(code);
      const shopifyCode = new ShopifyCode();
      shopifyCode.code = code;
      shopifyCode.user = user;
      promises.push(this.shopifyCodeRepo.save(shopifyCode));
    }
    Promise.all(promises); // not waiting all done to response fe
    return codes;
  }

  async claimSculptureCode(
    sculptureBalanceDto: SculptureBalanceDto
  ): Promise<string[]> {
    const balance = await this.sculptureBalance(sculptureBalanceDto);
    console.log(balance);
    const currentlyOwnedCode = await this.shopifyCodeRepo.find({
      where: {
        user: sculptureBalanceDto.address,
      },
    });
    const newCodeAmount = balance.toNumber() - currentlyOwnedCode.length;
    const codes = await this.createShopifySculptureCode(
      sculptureBalanceDto.address,
      newCodeAmount
    );
    return codes;
  }
}
