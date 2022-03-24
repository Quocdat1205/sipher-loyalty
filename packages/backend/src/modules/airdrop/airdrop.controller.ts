import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";
import { MerchService } from "@modules/merch/merch.service";
import { AirdropType } from "src/entity/airdrop.entity";
import { ParseEthereumAddress } from "src/pipes/ethereum-address..pipe";

import { etherDto } from "./airdrop.dto";
import { AirdropService } from "./airdrop.service";
import { ResAllAirdrop } from "./airdrop.type";

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
  @ApiOkResponse({ type: ResAllAirdrop })
  @Get("/:airdropType/:publicAddress")
  async getAirdropByType(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Param("airdropType") airdropType: AirdropType,
    @Req() req: any
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.airdropService.getAirdropByType(publicAddress, airdropType);
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

  @ApiOkResponse({ type: etherDto })
  @Get("all-merch")
  async getAllMerch(
    @Query("publicAddress", ParseEthereumAddress) publicAddress: string
  ) {
    // const { publicAddress } = query;

    return this.merchService.getAllMerch(publicAddress);
  }
}
