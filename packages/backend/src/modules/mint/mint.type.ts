import { ERC1155Lootbox, PendingMint } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

export class InfoPendingMintDto {
  @ApiProperty({ type: ERC1155Lootbox })
  property: ERC1155Lootbox;

  @ApiProperty({ type: Number })
  batchID: number;

  @ApiProperty({ type: Number })
  amount: number;
}

export class ResPendingMintDto {
  @ApiProperty({ type: PendingMint })
  pending: PendingMint;

  @ApiProperty({ type: PendingMint, isArray: true })
  info: InfoPendingMintDto;
}
