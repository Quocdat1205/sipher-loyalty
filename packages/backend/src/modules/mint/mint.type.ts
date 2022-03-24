import { PendingMint } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

export class InfoPendingMintDto {
  @ApiProperty({ type: String })
  image: string;

  @ApiProperty({ type: Number })
  batchID: number;

  @ApiProperty({ type: Number })
  amount: number;
}

export class ResPendingMintDto extends PendingMint {
  @ApiProperty({ type: InfoPendingMintDto, isArray: true })
  info: InfoPendingMintDto;
}
