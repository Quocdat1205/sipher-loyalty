import { Body, Controller, Get, HttpCode, Param } from "@nestjs/common";

import { MultiTokenBalanceDto } from "./multi-token.dto";
import { MultiTokenService } from "./multi-token.service";

@Controller("erc1155")
export class MultiTokenController {
  constructor(private multiTokenService: MultiTokenService) {}

  @Get("balance/:address/:tokenId")
  @HttpCode(200)
  async getBalance(@Param() multiTokenBalanceDto: MultiTokenBalanceDto) {
    return { some: "thing" };
  }
}
