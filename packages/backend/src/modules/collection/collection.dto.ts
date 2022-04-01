import {
  IsDecimal,
  IsEnum,
  IsEthereumAddress,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { NftItem } from "@modules/nft/nft-item.dto";
import { CollectionCategory, SipherCollection } from "@entity";

export class PortfolioQuery {
  @ApiProperty({
    enumName: "CollectionCategory",
    enum: CollectionCategory,
  })
  @IsEnum(CollectionCategory)
  @IsOptional()
  category?: CollectionCategory;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  chainId?: string;
}

export class PortfolioByCollectionQuery {
  @ApiProperty()
  @IsEthereumAddress()
  userAddress: string;

  @ApiProperty()
  @IsString()
  collectionId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  from?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  size?: number;
}

export class PortfolioByCollectionResponse {
  @ApiProperty({ type: SipherCollection })
  collection: SipherCollection;

  @ApiProperty({
    type: Number,
  })
  total: number;

  @ApiProperty({
    type: NftItem,
    isArray: true,
  })
  items: NftItem[];
}

export class Portfolio extends SipherCollection {
  @ApiProperty({ type: Number })
  total: number;
}

export class CollectionStats {
  @IsDecimal()
  @ApiProperty({ type: Number })
  floorPrice: number;

  @IsDecimal()
  @ApiProperty({ type: Number })
  totalVolume: number;

  @IsDecimal()
  @ApiProperty({ type: Number })
  marketCap: number;

  @IsNumber()
  @ApiProperty({ type: Number })
  totalSupply: number;

  @IsNumber()
  @ApiProperty({ type: Number })
  totalSales: number;
}

export interface UserSocialInfo {
  address: string;
  name: string;
  avatarImage: string;
}
