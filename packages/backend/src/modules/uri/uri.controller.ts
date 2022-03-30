import { Request } from "express";
import { ERC1155Lootbox, ERC1155Sculpture } from "@entity";
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";
import { UserRole } from "@modules/auth/auth.types";

// import { sessionType } from "../auth/auth.type"
import { URIService } from "./uri.service";

@ApiTags("uri")
@Controller("uri")
export class URIController {
  constructor(
    private uriService: URIService,
    private authService: AuthService
  ) {}

  @Get("erc1155-lootbox/:tokenId")
  async getDataERC1155Lootbox(@Param("tokenId") tokenId: string) {
    return this.uriService.getDataERC1155Lootbox(tokenId);
  }

  @Get("erc1155-sculpture/:tokenId")
  async getDataERC1155Sculpture(@Param("tokenId") tokenId: string) {
    return this.uriService.getDataERC1155Sculpture(tokenId);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Put("erc1155-sculpture")
  async updateERC1155Sculpture(
    @Body() body: ERC1155Sculpture,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(
      req.userData,
      UserRole.LOYALTY_ADMIN_AIRDROP
    );
    return this.uriService.updateERC1155Sculpture(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Put("erc1155-lootbox")
  async updateERC1155Lootbox(
    @Body() body: ERC1155Lootbox,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(
      req.userData,
      UserRole.LOYALTY_ADMIN_AIRDROP
    );
    return this.uriService.updateERC1155Lootbox(body);
  }
}
