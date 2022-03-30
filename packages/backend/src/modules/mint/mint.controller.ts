import { Request } from "express";
import { PendingMint } from "@entity";
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";
import { ParseEthereumAddress } from "src/pipes/ethereum-address..pipe";

import { MintService } from "./mint.service";
import { BodyUpdatePendingMint, ResPendingMintDto } from "./mint.type";

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
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.mintService.getPendingLootbox(publicAddress);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: PendingMint })
  @Put("pending/status/")
  async updateStatusPendingLootbox(
    @Body() body: BodyUpdatePendingMint,
    @Req() req: Request
  ) {
    await this.authService.verifyAddress(body.publicAddress, req.userData);
    return this.mintService.updateStatusPendingLootbox(body);
  }
}
