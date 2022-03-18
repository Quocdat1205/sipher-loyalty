import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { MultiTokenBalanceDto } from "./multi-token.dto";
import { MultiTokenService } from "./multi-token.service";

@Controller("erc1155")
export class MultiTokenController {
  constructor(private multiTokenService: MultiTokenService) {}

  @Get("balance/:address/:tokenId")
  @HttpCode(200)
  async getBalance(@Param() multiTokenBalanceDto: MultiTokenBalanceDto) {
    console.log(
      await this.multiTokenService.balanceOf(
        "0x1f955f98a678a735e47b68d11f46048f9ee4e9fb",
        multiTokenBalanceDto
      )
    );
    return { some: "thing" };
  }
}
