import { IsBoolean, IsNumber, IsString } from "class-validator";

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
  collectionId: string;

  @IsString()
  owner: string;

  @IsString()
  tokenId: string;

  @IsNumber()
  chainId: number;

  @IsString()
  name: string;

  @IsString()
  creator: string;

  @IsString()
  auctionId?: string;

  @IsString()
  lastListingId?: string;

  @IsNumber()
  price?: number;

  @IsString()
  currency?: string;

  @IsNumber()
  lastPrice?: number;

  @IsString()
  lastCurrency?: string;

  @IsString()
  tokenUri: string;

  @IsString()
  imageUrl: string;

  @IsString()
  imageThumbnailUrl: string;

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

export enum TokenType {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}
