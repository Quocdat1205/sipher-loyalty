import { ApiProperty } from "@nestjs/swagger";

export class PriceData {
  @ApiProperty({ type: Number })
  usd: number;

  @ApiProperty({ type: Number })
  eth: number;

  @ApiProperty({ type: Number })
  change: number;
}
export class PricesData {
  @ApiProperty({ type: PriceData })
  sipherPrice: PriceData;

  @ApiProperty({ type: PriceData })
  ethereumPrice: PriceData;

  @ApiProperty({ type: PriceData })
  maticPrice: PriceData;
}
