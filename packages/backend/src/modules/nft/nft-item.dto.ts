import { Transform } from "class-transformer"
import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class NftItemAttributeFilterDto {
  @IsString()
  traitType: string

  @IsString({ each: true })
  values: string[]
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
  owner?: string

  @IsString({ each: true })
  @IsOptional()
  collections?: string[]

  @IsEnum(NftItemListingType, { each: true })
  @IsOptional()
  listingTypes?: NftItemListingType[]

  @IsString({ each: true })
  @IsOptional()
  rarities?: string[]

  @Min(0)
  @IsNumber()
  @IsOptional()
  priceFrom?: number

  @Min(0)
  @IsNumber()
  @IsOptional()
  priceTo?: number

  attributes?: NftItemAttributeFilterDto[]

  @IsEnum(NftItemFilterOrderBy)
  @IsOptional()
  orderBy?: NftItemFilterOrderBy
}

export class GetNftItemReqDto {
  @IsString()
  @IsOptional()
  collectionId?: string

  @Transform(value => value && value.toString().toLowerCase())
  @IsString()
  @IsOptional()
  owner?: string
}

export class LikeNftItemReqDto {
  @Transform(value => value && value.toString().toLowerCase())
  @IsString()
  owner: string

  @IsString()
  itemId: string
}
