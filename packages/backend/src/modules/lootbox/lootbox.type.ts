import { IsEthereumAddress } from "class-validator";
import { Lootbox, PendingMint } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

import { TransformLowercase } from "@utils/transfomers";
import { ClaimableLootbox } from "src/entity/claimableLootbox.entity";

export class MintBatchLootboxInputDto {
  @TransformLowercase()
  @ApiProperty({ type: String })
  @IsEthereumAddress()
  publicAddress: string;

  @ApiProperty({ type: Number, isArray: true })
  batchID: number[];

  @ApiProperty({ type: Number, isArray: true })
  amount: number[];
}

export class MintLootboxInputDto {
  @TransformLowercase()
  @ApiProperty({ type: String })
  @IsEthereumAddress()
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
  deadline?: number;
}

export interface MintBatchLootboxInput {
  publicAddress: string;
  batchID: number[];
  amount: number[];
  deadline?: number;
}
