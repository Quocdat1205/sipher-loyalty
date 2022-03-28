import { Airdrop, ImageUrl } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

// convert type of merch and other from merchandise to airdrop
export class ResAllAirdrop {
  @ApiProperty({ type: Airdrop, isArray: true })
  token: Airdrop[];

  @ApiProperty({ type: Airdrop, isArray: true })
  nft: Airdrop[];

  @ApiProperty({ type: Airdrop, isArray: true })
  merchandise: Airdrop[];

  @ApiProperty({ type: Airdrop, isArray: true })
  other: Airdrop[];
}

export class ResNFTAirdrop {
  @ApiProperty({ type: Airdrop, isArray: true })
  nft: Airdrop[];
}

export class ResTokenAirdrop {
  @ApiProperty({ type: Airdrop, isArray: true })
  token: Airdrop[];
}

export class ResMerchAirdrop {
  @ApiProperty({ type: Airdrop, isArray: true })
  merch: Airdrop[];
}

export class ResAirdrop {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({
    type: () => ImageUrl,
    isArray: true,
  })
  imageUrls?: ImageUrl[];

  @ApiProperty({ type: String, isArray: true, default: [], nullable: true })
  size?: string[];

  @ApiProperty({ type: String, isArray: true, default: [], nullable: true })
  color?: string[];

  @ApiProperty({ type: String })
  type: string;
}
