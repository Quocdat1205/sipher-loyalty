import { Module } from "@nestjs/common"
import { NftItemService } from "./nftItem.service"
import { NftItemController } from "./nftItem.controller"

@Module({
  providers: [NftItemService],
  exports: [NftItemService],
  controllers: [NftItemController],
})
export class NftItemModule {}
