import { Matches } from "class-validator";
import { Lootbox, PendingMint } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

import { ClaimableLootbox } from "src/entity/claimableLootbox.entity";

export class MintBatchLootboxInputDto {
  @ApiProperty()
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  publicAddress: string;

  @ApiProperty({ type: [Number] })
  batchID: number[];

  @ApiProperty({ type: [Number] })
  amount: number[];
}

export class MintLootboxInputDto {
  @ApiProperty()
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  publicAddress: string;

  @ApiProperty()
  batchID: number;

  @ApiProperty()
  amount: number;
}

export class resMintBatchDto {
  @ApiProperty()
  signanture: string;

  @ApiProperty()
  data: Lootbox[];

  @ApiProperty()
  pending: PendingMint[];
}

export class resMintSingleDto {
  @ApiProperty()
  signanture: string;

  @ApiProperty()
  data: Lootbox;

  @ApiProperty()
  pending: PendingMint[];
}

export class resClaimLootboxDto {
  @ApiProperty()
  resultClaimableLootbox: ClaimableLootbox;

  @ApiProperty()
  resultLootbox: Lootbox;
}

export class resLootboxDto {
  @ApiProperty()
  data: Lootbox[];
}

export class resClaimableLootboxDto {
  @ApiProperty()
  data: ClaimableLootbox[];
}

export class ClaimLootboxInputDto {
  @ApiProperty()
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  publicAddress: string;

  @ApiProperty()
  tokenId: number;

  @ApiProperty()
  expiredDate: Date;
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
