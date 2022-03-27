import { MintStatus, PendingMint } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

export class InfoPendingMintDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  image: string;

  @ApiProperty({ type: Number })
  tokenId: number;

  @ApiProperty({ type: Number })
  quantity: number;
}

export class ResPendingMintDto extends PendingMint {
  @ApiProperty({ type: InfoPendingMintDto, isArray: true })
  info: InfoPendingMintDto;
}

export class BodyUpdatePendingMint {
  @ApiProperty({ type: String })
  publicAddress: string;

  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String, enum: MintStatus, enumName: "MintStatus" })
  status: MintStatus;
}
