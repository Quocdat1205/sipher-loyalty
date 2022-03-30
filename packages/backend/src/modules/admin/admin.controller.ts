import { MerchUpdateDto } from "@modules/merch/merch.dto";
import { MerchService } from "@modules/merch/merch.service";
import { Body, Controller, Param, Put } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
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
    private adminService: AdminService
  ) {}

  @Put("merch/:merchId")
  async updateMerchById(
    @Param("merchId") merchId: number,
    @Body() merchUpdateDto: MerchUpdateDto
  ) {
    await this.merchService.updateMerch(merchId, merchUpdateDto);
    return {
      updated: true,
    };
  }

  @ApiParam({
    name: "itemId",
    type: Number,
  })
  @Put("item/:itemId")
  async updateItemById(
    @Param() params: ItemIdParam,
    @Body() updateItemDto: UpdateItemDto
  ) {
    await this.adminService.updateItemById(params.itemId, updateItemDto);
    return {
      updated: true,
    };
  }

  @ApiParam({
    name: "imageUrlId",
    type: Number,
  })
  @Put("imageUrl/:imageUrlId")
  async updateImageUrlById(
    @Param() params: ImageUrlIdParam,
    @Body() updateImageUrlDto: UpdateImageUrlDto
  ) {
    await this.adminService.updateImageUrlById(
      params.imageUrlId,
      updateImageUrlDto
    );
    return {
      updated: true,
    };
  }
}
