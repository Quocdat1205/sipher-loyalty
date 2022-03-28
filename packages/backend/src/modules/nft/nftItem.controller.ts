import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { NftItemService } from "./nftItem.service";

@ApiTags("nft")
@Controller("nft")
export class NftItemController {
  constructor(private nftService: NftItemService) {}

  @Get("get-by-collection/:id")
  async getByCollection(@Param("id") id: string) {
    const collections = [id.toLowerCase()];

    return this.nftService.search({ collections });
  }
}
