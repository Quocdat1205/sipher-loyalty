import { Merch } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

import { Airdrop } from "src/entity/airdrop.entity";

export class ResAllAirdop {
  @ApiProperty({ type: Airdrop, isArray: true })
  token: Airdrop;

  @ApiProperty({ type: Airdrop, isArray: true })
  nft: Airdrop;

  @ApiProperty({ type: Merch, isArray: true })
  merch: Merch;
}
