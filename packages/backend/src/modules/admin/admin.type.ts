import { IsEnum } from "class-validator";
import {
  Airdrop,
  Burned,
  Canceled,
  ClaimableLootbox,
  ImageUrl,
  Item,
  Lootbox,
  Merchandise,
  PendingMint,
  SipherCollection,
} from "@entity";
import { ApiProperty } from "@nestjs/swagger";

export enum TableType {
  MERCH = "MERCH",
  AIRDROP = "AIRDROP",
  LOOTBOX = "LOOTBOX",
  CLAIMABLELOOTBOX = "CLAIMABLELOOTBOX",
  MINT = "MINT",
  BURN = "BURN",
  CANCEL = "CANCEL",
  COLLECTION = "COLLECTION",
  ERC1155LOOTBOX = "ERC1155LOOTBOX",
  ERC1155SCULPTURE = "ERC1155SCULPTURE",
}

export class QueryAdminGetAll {
  @ApiProperty({
    enumName: "TableType",
    enum: TableType,
  })
  @IsEnum(TableType)
  type: TableType;

  @ApiProperty({ type: Number })
  from?: number;

  @ApiProperty({ type: Number })
  size?: number;
}

export class BodyAdminUpdate {
  @ApiProperty({
    enumName: "TableType",
    enum: TableType,
  })
  @IsEnum(TableType)
  type: TableType;

  @ApiProperty({ type: Airdrop })
  airdrop?: Airdrop;

  @ApiProperty({ type: Merchandise })
  merch?: Merchandise;

  @ApiProperty({ type: Item })
  item?: Item;

  @ApiProperty({ type: ImageUrl })
  imageUrl?: ImageUrl;

  @ApiProperty({ type: PendingMint })
  mint?: PendingMint;

  @ApiProperty({ type: Canceled })
  cancel?: Canceled;

  @ApiProperty({ type: Burned })
  burn?: Burned;

  @ApiProperty({ type: SipherCollection })
  collection?: SipherCollection;

  @ApiProperty({ type: Lootbox })
  lootbox?: Lootbox;

  @ApiProperty({ type: ClaimableLootbox })
  claimableLootbox?: ClaimableLootbox;
}
