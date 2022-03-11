import { Module } from "@nestjs/common";

import { NftItemController } from "./nftItem.controller";
import { NftItemService } from "./nftItem.service";

@Module({
  providers: [NftItemService],
  exports: [NftItemService],
  controllers: [NftItemController],
})
export class NftItemModule {}
