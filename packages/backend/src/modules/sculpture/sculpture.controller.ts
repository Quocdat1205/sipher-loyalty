import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SculptureService } from "./sculpture.service";

@ApiTags("sculpture")
@Controller("sculpture")
export class SculptureController {
  constructor(private sculptureService: SculptureService) {}

  @Get("shopify-code/:ownerAddress")
  async getUserOwnedCode(@Param("ownerAddress") ownerAddress: string) {
    const shopifyCodes = await this.sculptureService.getAddressOwnedCode(
      ownerAddress
    );
    return {
      shopifyCodes: shopifyCodes.map((code) => code.code),
    };
  }
}
