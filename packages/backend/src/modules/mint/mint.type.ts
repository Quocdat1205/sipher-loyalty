import { PendingMint } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

export class InfoPendingMintDto {
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
