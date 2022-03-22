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

import { bioDto } from "./user.dto";
import { UserService } from "./user.service";
import CoinMarketCap from "coinmarketcap-api";

const apiKey = "1f422488-4c3b-4914-8ba6-6f97607cec22";

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

  @Get("get-price")
  async getPriceCoinMarketCap() {
    const client = new CoinMarketCap(apiKey);

    // client
    //   .getIdMap({ symbol: ["BTC", "ETH"] })
    //   .then(console.log)
    //   .catch(console.error);

    // return client
    //   .getTickers({ convert: "USD", sort: "name", cryptocurrencyType: "coins" })
    //   .then((result: any) => {
    //     console.log(result);
    //   })
    //   .catch(console.error);

    // client
    //   .getIdMap({ symbol: "Sipher" })
    //   .then(console.log)
    //   .catch(console.error);

    client.getMetadata({ id: "15469" }).then(console.log).catch(console.error);
  }
}
