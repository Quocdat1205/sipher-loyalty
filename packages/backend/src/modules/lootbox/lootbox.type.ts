import { ApiProperty } from "@nestjs/swagger"

export class MintLootboxInputDto {
  @ApiProperty()
  walletAddress: string

  @ApiProperty()
  batchID: number[]

  @ApiProperty()
  amount: number[]
}

export interface MintLootboxInput {
  walletAddress: string
  batchID: number[]
  amount: number[]
}
