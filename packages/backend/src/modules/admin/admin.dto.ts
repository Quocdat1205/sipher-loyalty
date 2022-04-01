import { IsNumber, IsNumberString } from "class-validator";
import { ImageUrl, Item } from "@entity";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

export class ItemIdParam {
  @ApiProperty()
  @IsNumberString()
  itemId: number;
}

export class UpdateItemDto extends PartialType(
  OmitType(Item, ["createdAt", "updatedAt", "id", "merchandise", "imageUrls"])
) {}

export class ImageUrlIdParam {
  @ApiProperty()
  @IsNumberString()
  imageUrlId: number;
}

export class UpdateImageUrlDto extends PartialType(
  OmitType(ImageUrl, ["createdAt", "updatedAt", "id", "item", "airdrop"])
) {
  @ApiProperty()
  @IsNumber()
  itemId: number;

  @ApiProperty()
  @IsNumber()
  airdropId: number;
}
