import { Airdrop, ImageUrl } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

import { TransformLowercase } from "@utils/transfomers";

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

export class DataAirdropTokens {
  @ApiProperty({ type: String, isArray: true })
  proof: string;

  @ApiProperty({ type: String })
  leaf: string;

  @ApiProperty({ type: Number })
  index: number;

  @TransformLowercase()
  @ApiProperty({ type: String })
  claimer: string;

  @ApiProperty({ type: String })
  totalAmount: string;
}

export class AirdropToken {
  @ApiProperty({ type: String })
  merkleRoot: string;

  @TransformLowercase()
  @ApiProperty({ type: String })
  addressContract: string;

  @ApiProperty({ type: Number })
  startTime: number;

  @ApiProperty({ type: Number })
  vestingInterval: number;

  @ApiProperty({ type: Number })
  numberOfVestingPoint: number;

  @ApiProperty({ type: ImageUrl, isArray: true })
  imageUrls: ImageUrl[];

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, isArray: true })
  description: string;

  @ApiProperty({ type: String })
  shortDescription: string;

  @ApiProperty({ type: DataAirdropTokens, isArray: true })
  data: DataAirdropTokens[];
}
export class AirdropTokens {
  @ApiProperty({ type: AirdropToken })
  data: AirdropToken;

  @ApiProperty({ type: String })
  key: string;
}
