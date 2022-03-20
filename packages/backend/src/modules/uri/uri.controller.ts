import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

// import { sessionType } from "../auth/auth.type"
import { URIService } from "./uri.service";

@ApiTags("uri")
@Controller("uri")
export class URIController {
  constructor(private uriService: URIService) {}

  @Get("erc1155-spaceship/:tokenID")
  async getDataERC1155Spaceship(@Param("tokenID") tokenID: number) {
    return this.uriService.getDataERC1155Spaceship(tokenID);
  }

  @Get("erc1155-sculpture/:tokenID")
  async getDataERC1155Sculpture(@Param("tokenID") tokenID: number) {
    return this.uriService.getDataERC1155Sculpture(tokenID);
  }
}
