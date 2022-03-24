import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumberString, IsOptional } from "class-validator";

import { CollectionCategory } from "src/entity/sipher-collection.entity";

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
