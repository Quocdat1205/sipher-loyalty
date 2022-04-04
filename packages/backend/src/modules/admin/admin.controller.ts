import { Request } from "express";
import { ERC1155Lootbox, ERC1155Sculpture } from "@entity";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
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
import {
  DistributeLootbox,
  DistributeLootboxs,
} from "@modules/lootbox/lootbox.type";
import { MerchUpdateDto } from "@modules/merch/merch.dto";
import { MerchService } from "@modules/merch/merch.service";
import { URIService } from "@modules/uri/uri.service";
import { ParseEthereumAddress } from "src/pipes/ethereum-address..pipe";

import {
  ImageUrlIdParam,
  ItemIdParam,
  UpdateImageUrlDto,
  UpdateItemDto,
} from "./admin.dto";
import { AdminService } from "./admin.service";
import { BodyAdminUpdate, QueryAdminGetAll } from "./admin.type";

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
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.airdropService.updateAirdropTokens(body.data);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("merch/:publicAddress")
  async getMerchById(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.merchService.getAllMerchByPublicAddress(publicAddress);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Patch("merch/:merchId")
  async updateMerchById(
    @Param("merchId") merchId: number,
    @Body() merchUpdateDto: MerchUpdateDto,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
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
  @Patch("item/:itemId")
  async updateItemById(
    @Param() params: ItemIdParam,
    @Body() updateItemDto: UpdateItemDto,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
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
  @Patch("imageUrl/:imageUrlId")
  async updateImageUrlById(
    @Param() params: ImageUrlIdParam,
    @Body() updateImageUrlDto: UpdateImageUrlDto,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
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
  @Post("distributes")
  async distributesLootbox(
    @Body() body: DistributeLootboxs,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.lootBoxService.distributesLootbox(body.data);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Post("distribute")
  async distributeLootbox(
    @Body() body: DistributeLootbox,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.lootBoxService.distributeLootbox(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Put("erc1155-sculpture")
  async updateERC1155Sculpture(
    @Body() body: ERC1155Sculpture,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.uriService.updateERC1155Sculpture(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Put("erc1155-lootbox")
  async updateERC1155Lootbox(
    @Body() body: ERC1155Lootbox,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.uriService.updateERC1155Lootbox(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Post("erc1155-sculpture")
  async addERC1155Sculpture(
    @Body() body: ERC1155Sculpture,
    @Req() req: Request
  ) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.uriService.addERC1155Sculpture(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Post("erc1155-lootbox")
  async addERC1155Lootbox(@Body() body: ERC1155Lootbox, @Req() req: Request) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.uriService.addERC1155Lootbox(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Get("get-all")
  async getAll(@Query() query: QueryAdminGetAll, @Req() req: Request) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.adminService.getDataTableByType(
      query.from,
      query.size,
      query.type
    );
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Put("update-by-id")
  async updateAll(@Body() body: BodyAdminUpdate, @Req() req: Request) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.adminService.updateDataTableByType(body);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Delete("delete-collection-by-id/:id")
  async deleteCollection(@Param("id") id: string, @Req() req: Request) {
    await this.authService.verifyAdmin(req, UserRole.LOYALTY_ADMIN);
    return this.adminService.deleteCollection(id);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @Put("refresh")
  async refresh(@Req() req: Request) {
    return this.authService.fetchUserData(req);
  }
}
