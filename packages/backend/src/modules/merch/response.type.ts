import { IsEthereumAddress } from "class-validator";
import { ViewType } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

export class MerchType {
  @ApiProperty({ type: Number })
  id_transaction: number;

  @ApiProperty({ type: String })
  @IsEthereumAddress()
  publicAddress: string;

  @ApiProperty({ type: String })
  tier: string;

  @ApiProperty({ type: String })
  merch_item: string;

  @ApiProperty({ type: Number })
  quantity: number;

  @ApiProperty({ type: Number })
  quantity_shipped: number;

  @ApiProperty({ type: Boolean })
  isShipped: boolean;

  @ApiProperty({ type: String, enum: ViewType, enumName: "ViewType" })
  name: ViewType;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  imageUrl: string;

  @ApiProperty({ type: String, default: "MERCH" })
  type: string;
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
