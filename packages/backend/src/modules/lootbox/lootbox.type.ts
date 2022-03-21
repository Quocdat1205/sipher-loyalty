import { Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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

export class ClaimLootboxInputDto {
  @ApiProperty()
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  publicAddress: string;

  @ApiProperty()
  tokenId: number;
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
