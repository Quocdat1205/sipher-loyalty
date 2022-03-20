import { Controller, Get, Put, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { claimMerchDto, walletAddressDto } from "./merch.dto";
import { MerchService } from "./merch.service";

@ApiTags("merch")
@Controller("merch")
export class MerchController {
  constructor(private merchService: MerchService) {}

  @Get("get-all")
  async getAllMerch(@Query() query: walletAddressDto) {
    const { wallet_address } = query;

    return this.merchService.getAllMerch(wallet_address);
  }

  @Put("claim")
  async claimMerch(@Query() query: claimMerchDto) {
    const { wallet_address, id_merch } = query;

    return this.merchService.claimItems({ wallet_address, id_merch });
  }
}
