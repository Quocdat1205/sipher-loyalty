import { Matches } from "class-validator";
import { Lootbox, PendingMint } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

import { ClaimableLootbox } from "src/entity/claimableLootbox.entity";

export class MintBatchLootboxInputDto {
  @ApiProperty({ type: String })
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  publicAddress: string;

  @ApiProperty({ type: Number, isArray: true })
  batchID: number[];

  @ApiProperty({ type: Number, isArray: true })
  amount: number[];
}

export class MintLootboxInputDto {
  @ApiProperty({ type: String })
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  publicAddress: string;

  @ApiProperty({ type: Number })
  batchID: number;

  @ApiProperty({ type: Number })
  amount: number;
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

export interface MintLootboxInput {
  publicAddress: string;
  batchID: number;
  amount: number;
}

export interface MintBatchLootboxInput {
  publicAddress: string;
  batchID: number[];
  amount: number[];
}
