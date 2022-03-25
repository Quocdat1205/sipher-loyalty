import { Controller, Get } from "@nestjs/common";

import { PriceService } from "./price.service";

@Controller("price")
export class PriceController {
  constructor(private priceService: PriceService) {}

  @Get("sipher")
  async getSipherPrice() {
    return this.priceService.getSipherPrice();
  }

  @Get("ether")
  async getEtherprice() {
    return this.priceService.getEtherPrice();
  }

  @Get("sipher/change")
  async getPriceChange() {
    return this.priceService.getPriceChange();
  }
}
