import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";

import { MintService } from "./mint.service";
import { ResPendingMintDto } from "./mint.type";

@ApiTags("mint")
@Controller("mint")
export class MintController {
  constructor(
    private mintService: MintService,
    private authService: AuthService
  ) {}

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: ResPendingMintDto, isArray: true })
  @Get("pending/lootbox/:publicAddress")
  async getPendingLootbox(
    @Param("publicAddress") publicAddress: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.mintService.getPendingLootbox(publicAddress);
  }
}
