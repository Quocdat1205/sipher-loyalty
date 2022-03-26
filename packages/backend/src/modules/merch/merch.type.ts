import { ApiProperty } from "@nestjs/swagger";

export interface redeemMerchType {
  publicAddress: string;
  list_merch: Array<merch>;
  info: shipping_info;
  address: shipping_address;
}

export interface merch {
  merch_item: string;
  quantity: number;
  size?: string;
  color?: string;
}

export class shipping_info {
  @ApiProperty({ type: String })
  publicAddress: string;

  @ApiProperty({ type: String })
  first_name?: string;

  @ApiProperty({ type: String })
  last_name?: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  phone: string;
}

export class shipping_address {
  @ApiProperty({ type: String })
  publicAddress: string;

  @ApiProperty({ type: String })
  street_address: string;

  @ApiProperty({ type: String })
  town: string;

  @ApiProperty({ type: String })
  state: string;

  @ApiProperty({ type: String })
  country: string;

  @ApiProperty({ type: String })
  zip_code: string;
}

export class ordertype {
  @ApiProperty({ type: String })
  id_order: string;

  @ApiProperty({ type: String })
  publicAddress: string;

  @ApiProperty({ type: String })
  id_address: string;

  @ApiProperty({ type: String })
  id_receiver: string;

  @ApiProperty({ type: Array })
  list_item_order: Array<itemOrder>;
}

export class itemOrder {
  @ApiProperty({ type: String })
  size?: string;

  @ApiProperty({ type: String })
  color?: string;

  @ApiProperty({ type: Number })
  quantity?: number;

  @ApiProperty({ type: String })
  id_transaction: string;
}
