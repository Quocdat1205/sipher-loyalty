import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";

// import { sessionType } from "../auth/auth.type"
import { URIService } from "./uri.service";

@Controller("uri")
export class URIController {
  constructor(private uriService: URIService) {}

  @Get("erc1155-spaceship/:tokenId")
  async getDataERC1155Spaceship(@Param("tokenId") tokenId: number) {
    return this.uriService.getDataERC1155Spaceship(tokenId);
  }

  @Get("erc1155-sculpture/:tokenId")
  async getDataERC1155Sculpture(@Param("tokenId") tokenId: number) {
    return this.uriService.getDataERC1155Sculpture(tokenId);
  }
}
