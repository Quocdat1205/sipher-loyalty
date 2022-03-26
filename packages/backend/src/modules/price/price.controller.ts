import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";

import { PriceService } from "./price.service";
import { PriceDatas } from "./price.type";

@Controller("price")
export class PriceController {
  constructor(private priceService: PriceService) {}

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: PriceDatas })
  @Get("")
  async getPrice() {
    return this.priceService.getPrice();
  }
}
