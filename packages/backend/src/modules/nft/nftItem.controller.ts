import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { NftItemFilterDto } from "@modules/nft/nft-item.dto";

import { NftItemService } from "./nftItem.service";

@ApiTags("nft")
@Controller("nft")
export class NftItemController {
  constructor(private nftService: NftItemService) {}

  @Get("get-by-owner")
  async getByOwner() {
    const owner = "0x83629905189464CC16F5E7c12D54dD5e87459B33";

    return this.nftService.search({ owner });
  }

  @Get("get-by-collection")
  async getByCollection() {
    const collections = ["0x0c8f19A3496FDe87F55475ac652c7652093B16c7"];

    return this.nftService.search({ collections });
  }
}
