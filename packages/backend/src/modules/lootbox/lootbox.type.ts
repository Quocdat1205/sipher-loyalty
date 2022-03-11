import { Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MintBatchLootboxInputDto {
  @ApiProperty()
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  walletAddress: string;

  @ApiProperty({ type: [Number] })
  batchID: number[];

  @ApiProperty({ type: [Number] })
  amount: number[];
}

export class MintLootboxInputDto {
  @ApiProperty()
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  walletAddress: string;

  @ApiProperty()
  batchID: number;

  @ApiProperty()
  amount: number;
}

export interface MintLootboxInput {
  walletAddress: string;
  batchID: number;
  amount: number;
}

export interface MintBatchLootboxInput {
  walletAddress: string;
  batchID: number[];
  amount: number[];
}
