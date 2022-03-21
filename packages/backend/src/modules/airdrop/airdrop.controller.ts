import { Merch } from "@entity";
import { Controller, Get, Param, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";
import { MerchService } from "@modules/merch/merch.service";
import { Airdrop } from "src/entity/airdrop.entity";
import { ParseEthereumAddress } from "src/pipes/ethereum-address..pipe";

import { AirdropService } from "./airdrop.service";

@ApiTags("airdrop")
@Controller("airdrop")
export class AirdropController {
  constructor(
    private airdropService: AirdropService,
    private authService: AuthService,
    private merchService: MerchService
  ) {}

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: Airdrop })
  @Get("/all/:publicAddress")
  async getAllAirdrop(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.airdropService.getAllAirdrop(publicAddress);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: Airdrop })
  @Get("/token/:publicAddress")
  async getTokenAirdrop(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.airdropService.getTokenAirdrop(publicAddress);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: Merch })
  @Get("/merch/:publicAddress")
  async getAllMerch(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.merchService.getAllMerch(publicAddress);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({ type: Boolean })
  @Put("/merch/claim/:publicAddress/:id_merch")
  async claimMerch(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Param("id_merch") id_merch: string,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.merchService.claimItems({
      publicAddress,
      id_merch,
    });
  }
}
