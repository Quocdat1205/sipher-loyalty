import { MerchUpdateDto } from "@modules/merch/merch.dto";
import { MerchService } from "@modules/merch/merch.service";
import { Body, Controller, Param, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("admin")
@Controller("admin")
export class AdminController {
  constructor(private merchService: MerchService) {}

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
}
