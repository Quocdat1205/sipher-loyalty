import { Request } from "express";
import { Any } from "typeorm";
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
import { UserRole } from "@modules/auth/auth.types";
import { AirdropType } from "src/entity/airdrop.entity";
import { ParseEthereumAddress } from "src/pipes/ethereum-address..pipe";

import { AirdropService } from "./airdrop.service";
import {
  AirdropTokens,
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
  @Put("updateTokenList/:smartContract")
  async updateAirdropTokens(@Body() body: AirdropTokens, @Req() req: Request) {
    await this.authService.verifyAdmin(
      req.userData,
      UserRole.LOYALTY_ADMIN_AIRDROP
    );
    return this.airdropService.updateAirdropTokens(body.data);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({
    type: ResAllAirdrop || ResNFTAirdrop || ResTokenAirdrop || ResMerchAirdrop,
  })
  @Get("/:airdropType/:publicAddress")
  async getAirdropsByType(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Param("airdropType") airdropType: AirdropType,
    @Req() req: Request
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.airdropService.getAirdropsByType(publicAddress, airdropType);
  }

  @UseGuards(AtherGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOkResponse({
    type: ResAirdrop,
  })
  @Get("/:airdropType/:publicAddress/:id")
  async getAirdropByType(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Param("id") id: string,
    @Param("airdropType") airdropType: AirdropType,
    @Req() req: Request
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.airdropService.getAirdropByType(id, airdropType);
  }
}
