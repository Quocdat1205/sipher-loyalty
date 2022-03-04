import { Controller, Get, Query } from '@nestjs/common';
import { NftItemService } from './nftItem.service';
import { NftItemFilterDto } from '@module/nft/nft-item.dto';

@Controller('nft')
export class NftItemController {
  constructor(private nftService: NftItemService) {}

  @Get('get-all')
  async getAllNft(@Query() query: NftItemFilterDto) {
    const { owner } = query;

    return this.nftService.search({ owner });
  }
}
