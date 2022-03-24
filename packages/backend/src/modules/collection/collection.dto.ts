import { IsEnum, IsNumberString, IsOptional } from "class-validator";
import { CollectionCategory } from "src/entity/sipher-collection.entity";

export class PortfolioQuery {
  @IsEnum(CollectionCategory)
  @IsOptional()
  category: string;

  @IsNumberString()
  @IsOptional()
  chainId: string;
}
