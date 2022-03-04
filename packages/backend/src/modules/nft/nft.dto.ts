import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class NftItemAttribute {
  @IsString()
  trait_type: string;

  @IsString()
  value: string;
}
export class NftItem {
  @IsString()
  id: string;

  @IsString()
  collectionId: String;

  @IsString()
  owner: String;

  @IsString()
  tokenId: String;

  @IsNumber()
  chainId: number;

  @IsString()
  name: String;

  @IsString()
  creator: String;

  @IsString()
  auctionId?: String;

  @IsString()
  lastListingId?: String;

  @IsNumber()
  price?: number;

  @IsString()
  currency?: String;

  @IsNumber()
  lastPrice?: number;

  @IsString()
  lastCurrency?: String;

  @IsString()
  tokenUri: String;

  @IsString()
  imageUrl: String;

  @IsString()
  imageThumbnailUrl: String;

  attributes: NftItemAttribute[];

  @IsNumber()
  viewCount = 0;

  @IsNumber()
  favoriteCount = 0;

  @IsString()
  rarity?: string;

  @IsNumber()
  rarityRank = -1;

  @IsNumber()
  rarityScore = 0;

  @IsBoolean()
  favorited = false;
}
