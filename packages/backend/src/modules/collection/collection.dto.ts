import { IsEnum, IsNumberString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { NftItem } from "@modules/nft/nft-item.dto";
import {
  CollectionCategory,
  SipherCollection,
} from "src/entity/sipher-collection.entity";

export class PortfolioQuery {
  @ApiProperty({
    enumName: "CollectionCategory",
    enum: CollectionCategory,
  })
  @IsEnum(CollectionCategory)
  @IsOptional()
  category: CollectionCategory;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  chainId: string;
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
  })
  items: NftItem[];
}

export class Portfolio extends SipherCollection {
  @ApiProperty({ type: Number })
  total: number;
}
