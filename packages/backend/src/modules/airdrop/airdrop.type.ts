import { ApiProperty } from "@nestjs/swagger";

import { AllMerchType } from "@modules/merch/response.type";
import { Airdrop } from "src/entity/airdrop.entity";

export class ResAllAirdrop {
  @ApiProperty({ type: Airdrop, isArray: true })
  token: Airdrop[];

  @ApiProperty({ type: Airdrop, isArray: true })
  nft: Airdrop[];

  @ApiProperty({ type: Airdrop, isArray: true })
  merch: AllMerchType[];
}

export class ResNFTAirdrop {
  @ApiProperty({ type: Airdrop, isArray: true })
  nft: Airdrop;
}

export class ResTokenAirdrop {
  @ApiProperty({ type: Airdrop, isArray: true })
  token: Airdrop;
}

export class ResMerchAirdrop {
  @ApiProperty({ type: Airdrop, isArray: true })
  merch: AllMerchType[];
}
