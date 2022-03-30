import { Airdrop } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

// convert type of merch and other from merchandise to airdrop

export class ResAirdrop extends Airdrop {
  @ApiProperty({ type: String, isArray: true, default: [], nullable: true })
  size?: string[];

  @ApiProperty({ type: String, isArray: true, default: [], nullable: true })
  color?: string[];
}
export class ResAllAirdrop {
  @ApiProperty({ type: ResAirdrop, isArray: true })
  token: ResAirdrop[];

  @ApiProperty({ type: ResAirdrop, isArray: true })
  nft: ResAirdrop[];

  @ApiProperty({ type: ResAirdrop, isArray: true })
  merchandise: Airdrop[];

  @ApiProperty({ type: ResAirdrop, isArray: true })
  other: ResAirdrop[];
}

export class ResNFTAirdrop {
  @ApiProperty({ type: ResAirdrop, isArray: true })
  nft: ResAirdrop[];
}

export class ResTokenAirdrop {
  @ApiProperty({ type: ResAirdrop, isArray: true })
  token: ResAirdrop[];
}

export class ResMerchAirdrop {
  @ApiProperty({ type: ResAirdrop, isArray: true })
  merch: ResAirdrop[];
}
