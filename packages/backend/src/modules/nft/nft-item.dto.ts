import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { SipherCollection } from "@entity";
import { ApiProperty, OmitType } from "@nestjs/swagger";

export class NftItemAttributeFilterDto {
  @IsString()
  traitType: string;

  @IsString({ each: true })
  values: string[];
}

export enum NftItemListingType {
  BuyNow = "BuyNow",
  Auction = "Auction",
  HasOffer = "HasOffer",
  HasBid = "HasBid",
}

export enum NftItemFilterOrderBy {
  MostViewed = "MostViewed",
  MostFavorited = "MostFavorited",
  PriceAsc = "PriceAsc",
  PriceDesc = "PriceDesc",
  RarityAsc = "RarityAsc",
  RarityDesc = "RarityDesc",
  RecentlyListed = "RecentlyListed",
  EndingSoon = "EndingSoon",
}

export class NftItemFilterDto {
  @Transform(({ value }) => value && value.toLowerCase())
  @IsString()
  @IsOptional()
  owner?: string;

  @IsString({ each: true })
  @IsOptional()
  collections?: string[];

  @IsEnum(NftItemListingType, { each: true })
  @IsOptional()
  listingTypes?: NftItemListingType[];

  @IsString({ each: true })
  @IsOptional()
  rarities?: string[];

  @Min(0)
  @IsNumber()
  @IsOptional()
  priceFrom?: number;

  @Min(0)
  @IsNumber()
  @IsOptional()
  priceTo?: number;

  attributes?: NftItemAttributeFilterDto[];

  @IsEnum(NftItemFilterOrderBy)
  @IsOptional()
  orderBy?: NftItemFilterOrderBy;

  @IsString()
  @IsOptional()
  tokenId?: string;
}

export class GetNftItemReqDto {
  @IsString()
  @IsOptional()
  collectionId?: string;

  @Transform((value) => value && value.toString().toLowerCase())
  @IsString()
  @IsOptional()
  owner?: string;
}

export class LikeNftItemReqDto {
  @Transform((value) => value && value.toString().toLowerCase())
  @IsString()
  owner: string;

  @IsString()
  itemId: string;

  @IsString()
  profileImage: string;

  @IsString()
  username: string;
}

export class NftItemAttribute {
  @ApiProperty()
  trait_type: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  percentage: number;
}

export class Erc1155Owner {
  @ApiProperty({ type: String })
  publicAddress: string;

  @ApiProperty({ type: Number })
  totalOwned?: number;

  @ApiProperty({ type: String })
  profileImage?: string;

  @ApiProperty({ type: String })
  username?: string;
}

export class Erc721Owner extends OmitType(Erc1155Owner, ["totalOwned"]) {}

export class CreatorInfo extends Erc721Owner {}
export class NftItem {
  @IsString()
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @ApiProperty({ type: String })
  collectionId: string;

  @IsString()
  @ApiProperty({ type: String })
  tokenId: string;

  @IsString()
  @ApiProperty({ type: String })
  tokenUri?: string;

  @IsNumber()
  @ApiProperty({ type: String })
  chainId: number;

  @ApiProperty({
    type: NftItemAttribute,
    isArray: true,
  })
  attributes?: NftItemAttribute[];

  @IsString()
  @ApiProperty({ type: String })
  imageUrl: string;

  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @ApiProperty({ type: String })
  owner: string;

  @IsString()
  @ApiProperty({ type: String })
  creator?: string;

  @IsNumber()
  @ApiProperty({ type: Number })
  viewCount?: number;

  @IsString()
  @ApiProperty({ type: String })
  imageThumbnailUrl?: string;

  @IsNumber()
  @ApiProperty({ type: Number })
  rarityRank?: number;

  @IsNumber()
  @ApiProperty({ type: Number })
  rarityScore?: number;

  /* ERC1155 */
  @IsNumber()
  @ApiProperty({ type: Number })
  value?: number;

  @IsNumber()
  @ApiProperty({ type: Number })
  quantity?: number;

  @ApiProperty({ type: String })
  type?: string;

  @ApiProperty({
    type: Erc1155Owner,
    isArray: true,
  })
  allOwner?: Erc1155Owner[];

  /* ERC721 */
  @ApiProperty({
    type: Erc721Owner,
  })
  ownerInfo?: Erc721Owner;

  /* Creator Info */
  @ApiProperty({
    type: CreatorInfo,
  })
  creatorInfo?: CreatorInfo;

  /* Collection Info */
  @ApiProperty({
    type: SipherCollection,
  })
  collection?: SipherCollection;
}
