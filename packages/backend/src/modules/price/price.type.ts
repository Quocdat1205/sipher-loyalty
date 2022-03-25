import { ApiProperty } from "@nestjs/swagger";

export class PriceData {
  @ApiProperty({ type: Number })
  sipherPrice: number;

  @ApiProperty({ type: Number })
  etherPrice: number;

  @ApiProperty({ type: Number })
  priceChange: number;
}
