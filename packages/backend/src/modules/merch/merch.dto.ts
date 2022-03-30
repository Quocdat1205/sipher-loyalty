import { Merchandise } from "@entity";
import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class MerchUpdateDto extends PartialType(
  OmitType(Merchandise, ["item", "createdAt", "updatedAt", "id"])
) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  itemId?: number;
}
