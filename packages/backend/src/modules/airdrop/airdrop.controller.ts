import { Request } from "express";
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { AtherGuard } from "@modules/auth/auth.guard";
import { AuthService } from "@modules/auth/auth.service";
import { AirdropType } from "src/entity/airdrop.entity";
import { ParseEthereumAddress } from "src/pipes/ethereum-address..pipe";

import { AirdropService } from "./airdrop.service";
import {
  ResAllAirdrop,
  ResMerchAirdrop,
  ResNFTAirdrop,
  ResTokenAirdrop,
  Shipping,
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
  @Get("/:airdropType/:publicAddress")
  async getAirdropByType(
    @Param("publicAddress", ParseEthereumAddress) publicAddress: string,
    @Param("airdropType") airdropType: AirdropType,
    @Req() req: Request
  ) {
    await this.authService.verifyAddress(publicAddress, req.userData);
    return this.airdropService.getAirdropByType(publicAddress, airdropType);
  }

  // @ApiOkResponse({ type: Shipping })
  // @Post("shipping")
  // async shippingMerch(@Body() body: Shipping) {
  //   const {
  //     publicAddress,
  //     id_receiver,
  //     id_address,
  //     receiver,
  //     address,
  //     item_order,
  //   } = body;

  //   let find_id_receiver = "";
  //   let find_id_address = "";

  //   if (!id_receiver) {
  //     const find_receiver = await this.merchService.findAllReceiver(
  //       id_receiver
  //     );

  //     find_id_receiver = find_receiver.id_receiver;
  //   }

  //   if (!id_address) {
  //     const find_address = await this.merchService.findAllAddress(id_address);

  //     find_id_address = find_address.id_address;
  //   }

  //   if (!id_receiver && !id_address) {
  //     const find_receiver = await this.merchService.findAllReceiver(
  //       id_receiver
  //     );
  //     const find_address = await this.merchService.findAllAddress(id_address);

  //     find_id_receiver = find_receiver.id_receiver;

  //     find_id_address = find_address.id_address;
  //   }

  //   return true;
  // }
}
