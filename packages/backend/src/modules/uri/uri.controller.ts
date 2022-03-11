import { Controller, Get, Param } from "@nestjs/common";

// import { sessionType } from "../auth/auth.type"
import { URIService } from "./uri.service";

@Controller("uri")
export class URIController {
  constructor(private uriService: URIService) {}

  @Get("/:tokenId")
  async getData(@Param("tokenId") tokenId: number) {
    return this.uriService.getData(tokenId);
  }
}
