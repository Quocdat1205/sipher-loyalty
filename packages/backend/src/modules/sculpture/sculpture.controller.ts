import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { SculptureService } from "./sculpture.service";

@ApiTags("sculpture")
@Controller("sculpture")
export class SculptureController {
  constructor(private sculptureService: SculptureService) {}

  @Get("transaction/:ownerAddress")
  async getUserOwnedCode(@Param("ownerAddress") ownerAddress: string) {
    const transactions = await this.sculptureService.getAddressTx(ownerAddress);
    return {
      transactions,
    };
  }
}
