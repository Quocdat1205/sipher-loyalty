import { ApiProperty } from "@nestjs/swagger";

import { Airdrop } from "src/entity/airdrop.entity";

export class ResAllAirdrop {
  @ApiProperty({ type: Airdrop, isArray: true })
  token: Airdrop;

  @ApiProperty({ type: Airdrop, isArray: true })
  nft: Airdrop;
}
