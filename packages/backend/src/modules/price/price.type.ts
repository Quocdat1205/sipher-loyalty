import { ApiProperty } from "@nestjs/swagger";

export class PriceData {
  @ApiProperty({ type: Number })
  usd: number;

  @ApiProperty({ type: Number })
  eth: number;

  @ApiProperty({ type: Number })
  change: number;

  @ApiProperty({ type: Number })
  marketcap: number;

  @ApiProperty({ type: Number })
  marketcapChange: number;

  @ApiProperty({ type: Number })
  circulatingSupply: number;

  @ApiProperty({ type: Number, nullable: true })
  maxSupply: number | null;

  @ApiProperty({ type: Number, nullable: true })
  totalSupply: number | null;

  @ApiProperty({ type: Number })
  fullyDilutedValuation: number;
}
export class PriceDatas {
  @ApiProperty({ type: PriceData })
  sipherPrice: PriceData;

  @ApiProperty({ type: PriceData })
  ethereumPrice: PriceData;

  @ApiProperty({ type: PriceData })
  maticPrice: PriceData;
}
