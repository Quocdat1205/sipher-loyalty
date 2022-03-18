import { Body, Controller, Post } from "@nestjs/common";
import { SculptureBalanceDto } from "./sculpture.dto";
import { SculptureService } from "./sculpture.service";

@Controller("sculpture")
export class SculptureController {
  constructor(private sculptureService: SculptureService) {}

  @Post("claim-code")
  async claimShopifyCode(@Body() sculptureBalanceDto: SculptureBalanceDto) {
    const codes = await this.sculptureService.claimSculptureCode(
      sculptureBalanceDto
    );
    return {
      shopifyCode: codes,
    };
  }
}
