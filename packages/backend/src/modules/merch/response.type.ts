import { boolean } from "joi";
import { ViewType } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

export class AllMerchType {
  @ApiProperty({ type: Number })
  id_transaction: number;

  @ApiProperty({ type: String })
  publicAddress: string;

  @ApiProperty({ type: String })
  tier: string;

  @ApiProperty({ type: String })
  merch_item: string;

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Number })
  quantity_shipped: number;

  @ApiProperty({ type: boolean })
  isShipped: boolean;

  @ApiProperty({ type: String, enum: ViewType, enumName: "ViewType" })
  view: ViewType;
}

export class ReceiverType {
  @ApiProperty({ type: String })
  id_receiver: string;

  @ApiProperty({ type: String })
  first_name: string;

  @ApiProperty({ type: String })
  last_name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  phone: string;
}
