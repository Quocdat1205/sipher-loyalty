import { Address, Airdrop, ItemOrder, Receiver } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

export class ResAllAirdrop {
  @ApiProperty({ type: Airdrop, isArray: true })
  token: Airdrop;

  @ApiProperty({ type: Airdrop, isArray: true })
  nft: Airdrop;
}

export class Shipping {
  @ApiProperty({ type: String })
  publicAddress: string;

  @ApiProperty({ type: String })
  id_receiver?: string;

  @ApiProperty({ type: String })
  id_address?: string;

  @ApiProperty({ type: Receiver })
  receiver?: Receiver;

  @ApiProperty({ type: Address })
  address?: Address;

  @ApiProperty({ type: Array, isArray: true })
  item_order: ItemOrder;
}
