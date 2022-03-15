import { Controller, Get, Param } from "@nestjs/common";

import { ParseEthereumAddress } from "src/pipes/ethereum-address..pipe";

import { AirdropService } from "./airdrop.service";

@Controller("airdrop")
export class AirdropController {
  constructor(private airdropService: AirdropService) {}

  @Get("/:publicAddress/:campaignCode")
  async getAirdrop(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Param("campaignCode") campaignCode: string
  ) {
    return this.airdropService.getAirdrop(publicAddress, campaignCode);
  }
}
