import CoinMarketCap from "coinmarketcap-api";
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import constant from "@setting/constant";

import { bioDto } from "./user.dto";
import { UserService } from "./user.service";

const apiKey = constant.API_KEY_CMC;
const id_sipher = constant.ID_SIPHER;

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("upload-image")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          // 👈 this property
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async uploadImg(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const result = await this.userService.uploadFile(file);

    return result;
  }

  @Post("update-bio")
  @UseInterceptors(FileInterceptor("file"))
  async uploadBio(@Body() body: bioDto) {
    const { ather_id, bio } = body;

    return this.userService.updateBio(ather_id, bio);
  }

  @Get("get-sipher-statics")
  async getPriceCoinMarketCap() {
    const client = new CoinMarketCap(apiKey);

    const sipher = await client.getQuotes({ id: id_sipher, convert: "USD" });

    const sipher_data = sipher.data[id_sipher];

    const data = {
      sipher_price: sipher_data.quote.USD.price,
      marketCap: sipher_data.self_reported_market_cap,
      fullyDeluted: sipher_data.quote.USD.fully_diluted_market_cap,
      circulatingSupply: sipher_data.circulating_supply,
      maxSupply: sipher_data.max_supply,
    };

    return data;
  }
}
