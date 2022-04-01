import { IsNumber, IsOptional } from "class-validator";
import { Merchandise } from "@entity";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

export class MerchUpdateDto extends PartialType(
  OmitType(Merchandise, ["item", "createdAt", "updatedAt", "id"])
) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  itemId?: number;
}
