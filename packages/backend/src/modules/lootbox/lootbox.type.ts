import { ClaimableLootbox, Lootbox, PendingMint } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

import { TransformLowercase } from "@utils/transfomers";

export class MintBatchLootboxInputDto {
  @TransformLowercase()
  @ApiProperty({ type: String })
  publicAddress: string;

  @ApiProperty({ type: Number, isArray: true })
  batchID: number[];

  @ApiProperty({ type: Number, isArray: true })
  amount: number[];

  @ApiProperty({ type: Number })
  deadline?: number;
}

export class MintLootboxInputDto {
  @TransformLowercase()
  @ApiProperty({ type: String })
  publicAddress: string;

  @ApiProperty({ type: Number })
  batchID: number;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ type: Number })
  deadline?: number;
}

export class resMintBatchDto {
  @ApiProperty({ type: String })
  signanture: string;

  @ApiProperty({ type: Lootbox, isArray: true })
  data: Lootbox[];

  @ApiProperty({ type: PendingMint, isArray: true })
  pending: PendingMint[];
}

export class resMintSingleDto {
  @ApiProperty({ type: String })
  signanture: string;

  @ApiProperty({ type: Lootbox })
  data: Lootbox;

  @ApiProperty({ type: PendingMint, isArray: true })
  pending: PendingMint[];
}

export class resLootboxDto {
  @ApiProperty({ type: Lootbox, isArray: true })
  data: Lootbox[];
}

export class resClaimableLootboxDto {
  @ApiProperty({ type: ClaimableLootbox, isArray: true })
  data: ClaimableLootbox[];
}

export class DistributeLootbox {
  @TransformLowercase()
  @ApiProperty({ type: String })
  publicAddress: string;

  @ApiProperty({ type: Number })
  tokenId: number;

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty()
  expiredDate: number;
}
export class DistributeLootboxs {
  @ApiProperty({ type: DistributeLootbox, isArray: true })
  data: DistributeLootbox[];

  @ApiProperty({ type: String })
  key: string;
}
