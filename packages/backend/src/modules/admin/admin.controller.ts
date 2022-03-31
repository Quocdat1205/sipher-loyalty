import { Request } from "express";
import { ERC1155Lootbox, ERC1155Sculpture } from "@entity";
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";

import { AirdropService } from "@modules/airdrop/airdrop.service";
import { AirdropTokens } from "@modules/airdrop/airdrop.type";
import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";
import { UserRole } from "@modules/auth/auth.types";
import { LootBoxService } from "@modules/lootbox/lootbox.service";
import { DistributeLootboxs } from "@modules/lootbox/lootbox.type";
import { MerchUpdateDto } from "@modules/merch/merch.dto";
import { MerchService } from "@modules/merch/merch.service";
import { URIService } from "@modules/uri/uri.service";

import {
  ImageUrlIdParam,
  ItemIdParam,
  UpdateImageUrlDto,
  UpdateItemDto,
} from "./admin.dto";
import { AdminService } from "./admin.service";

@ApiTags("admin")
@Controller("admin")
export class AdminController {
  constructor(
    private merchService: MerchService,
    private adminService: AdminService,
    private authService: AuthService,
    private lootBoxService: LootBoxService,
    private uriService: URIService,
    private airdropService: AirdropService
  ) {}

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Put("updateTokenList/:smartContract")
  async updateAirdropTokens(@Body() body: AirdropTokens, @Req() req: Request) {
    await this.authService.verifyAdmin(
      req.userData,
      UserRole.LOYALTY_ADMIN_AIRDROP
    );
    return this.airdropService.updateAirdropTokens(body.data);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Put("merch/:merchId")
  async updateMerchById(
    @Param("merchId") merchId: number,
    @Body() merchUpdateDto: MerchUpdateDto,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(
      req.userData,
      UserRole.LOYALTY_ADMIN_AIRDROP
    );
    await this.merchService.updateMerch(merchId, merchUpdateDto);
    return {
      updated: true,
    };
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiParam({
    name: "itemId",
    type: Number,
  })
  @Put("item/:itemId")
  async updateItemById(
    @Param() params: ItemIdParam,
    @Body() updateItemDto: UpdateItemDto,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(
      req.userData,
      UserRole.LOYALTY_ADMIN_AIRDROP
    );
    await this.adminService.updateItemById(params.itemId, updateItemDto);
    return {
      updated: true,
    };
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiParam({
    name: "imageUrlId",
    type: Number,
  })
  @Put("imageUrl/:imageUrlId")
  async updateImageUrlById(
    @Param() params: ImageUrlIdParam,
    @Body() updateImageUrlDto: UpdateImageUrlDto,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(
      req.userData,
      UserRole.LOYALTY_ADMIN_AIRDROP
    );
    await this.adminService.updateImageUrlById(
      params.imageUrlId,
      updateImageUrlDto
    );
    return {
      updated: true,
    };
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Put("distribute")
  async distributeLootbox(
    @Body() body: DistributeLootboxs,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(
      req.userData,
      UserRole.LOYALTY_ADMIN_LOOTBOX_SPACESHIP
    );
    return this.lootBoxService.distributeLootbox(body.data);
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
      UserRole.LOYALTY_ADMIN_SMARTCONTRACT
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
      UserRole.LOYALTY_ADMIN_SMARTCONTRACT
    );
    return this.uriService.updateERC1155Lootbox(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Put("erc1155-sculpture")
  async addERC1155Sculpture(
    @Body() body: ERC1155Sculpture,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(
      req.userData,
      UserRole.LOYALTY_ADMIN_SMARTCONTRACT
    );
    return this.uriService.addERC1155Sculpture(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Post("erc1155-lootbox")
  async addERC1155Lootbox(@Body() body: ERC1155Lootbox, @Req() req: Request) {
    await this.authService.verifyAdmin(
      req.userData,
      UserRole.LOYALTY_ADMIN_SMARTCONTRACT
    );
    return this.uriService.addERC1155Lootbox(body);
  }
}
