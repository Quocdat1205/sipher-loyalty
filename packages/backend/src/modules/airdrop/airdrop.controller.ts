import { IsEnum } from "class-validator";
import { Request } from "express";
import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";
import { AirdropType } from "src/entity/airdrop.entity";
import { ParseEthereumAddress } from "src/pipes/ethereum-address..pipe";

import { AirdropService } from "./airdrop.service";
import {
  ResAirdrop,
  ResAllAirdrop,
  ResMerchAirdrop,
  ResNFTAirdrop,
  ResTokenAirdrop,
} from "./airdrop.type";

@ApiTags("airdrop")
@Controller("airdrop")
export class AirdropController {
  constructor(
    private airdropService: AirdropService,
    private authService: AuthService
  ) {}

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({
    type: ResAllAirdrop || ResNFTAirdrop || ResTokenAirdrop || ResMerchAirdrop,
  })
  @Get("/by-public-address/:airdropType/:publicAddress")
  async getAirdropsByType(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Param("airdropType") airdropType: AirdropType,
    @Req() req: Request
  ) {
    await this.authService.verifyAddress(publicAddress, req);
    return this.airdropService.getAirdropsByType(publicAddress, airdropType);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({
    type: ResAllAirdrop || ResNFTAirdrop || ResTokenAirdrop || ResMerchAirdrop,
  })
  @Get("/by-user-id/:type")
  async getAirdropsByTypeAndUserId(
    @Req() req: Request,
    @Param("type") type: AirdropType
  ) {
    return this.airdropService.getAirdropsByTypeAndUserId(req.userData, type);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({
    type: ResAirdrop,
  })
  @Get("by-public-address/:airdropType/:publicAddress/:id")
  async getDetailAirdropByType(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Param("id") id: string,
    @Param("airdropType") airdropType: AirdropType,
    @Req() req: Request
  ) {
    await this.authService.verifyAddress(publicAddress, req);
    return this.airdropService.getDetailAirdropByType(id, airdropType);
  }
}
