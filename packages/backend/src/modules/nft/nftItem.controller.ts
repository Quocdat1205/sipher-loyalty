import { Controller, Get, Query } from "@nestjs/common"

import { NftItemFilterDto } from "@modules/nft/nft-item.dto"

import { NftItemService } from "./nftItem.service"

@Controller("nft")
export class NftItemController {
  constructor(private nftService: NftItemService) {}

  @Get("get-all")
  async getAllNft(@Query() query: NftItemFilterDto) {
    const { owner } = query

    return this.nftService.search({ owner })
  }
}
