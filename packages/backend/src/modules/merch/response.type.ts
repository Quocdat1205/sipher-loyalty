import { IsEthereumAddress } from "class-validator";
import { ImageUrl, ViewType } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

export class MerchType {
  @ApiProperty({ type: Number })
  id_merch_list: number;

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

  @ApiProperty({ type: Image, isArray: true })
  imageUrls: ImageUrl[];

  @ApiProperty({ type: String, default: "MERCH" })
  type: string;
}

export class ReceiverType {
  @ApiProperty({ type: Number })
  id_receiver: number;

  @ApiProperty({ type: String })
  first_name: string;

  @ApiProperty({ type: String })
  last_name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  phone: string;
}
