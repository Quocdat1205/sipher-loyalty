import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum CollectionType {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export enum CollectionCategory {
  CHARACTER = "character",
  SCULPTURE = "sculpture",
  LOOTBOX = "lootbox",
  SPACESHIP = "spaceship",
}

@Entity()
export class SipherCollection {
  @PrimaryColumn()
  @ApiProperty({ type: String })
  id: string;

  @Column({
    type: "character varying",
  })
  @ApiProperty({ type: String })
  name: string;

  @Column({
    type: "character varying",
  })
  @ApiProperty({ type: String })
  collectionSlug: string;

  @Column({ type: "integer" })
  @ApiProperty({ type: Number })
  chainId: number;

  @Column({
    type: String,
    default: CollectionType.ERC721,
  })
  @ApiProperty({ enum: CollectionType, enumName: "CollectionType" })
  collectionType: CollectionType;

  @Column({
    type: String,
    default: CollectionCategory.CHARACTER,
  })
  @ApiProperty({ enum: CollectionCategory, enumName: "CollectionCategory" })
  category: CollectionCategory;

  @Column({
    type: "decimal",
    nullable: true,
  })
  @ApiProperty({ type: String })
  floorPrice?: number;

  @Column({
    type: "decimal",
    nullable: true,
  })
  @ApiProperty({ type: String })
  totalVolume?: number;

  @Column({
    type: "decimal",
    nullable: true,
  })
  @ApiProperty({ type: String })
  marketCap?: number;

  @Column({
    type: "integer",
    nullable: true,
  })
  @ApiProperty({ type: Number })
  totalSupply?: number;

  @Column({
    type: "integer",
    nullable: true,
  })
  @ApiProperty({ type: Number })
  totalSales?: number;

  @Column({
    type: "text",
    default: "",
  })
  @ApiProperty({ type: String })
  description: string;

  @Column({
    type: "character varying",
  })
  @ApiProperty({ type: String })
  logoImage: string;

  @Column({
    type: "character varying",
  })
  @ApiProperty({ type: String })
  bannerImage: string;

  @Column({
    type: "character varying",
  })
  @ApiProperty({ type: String })
  siteUrl: string;

  @Column({
    type: "boolean",
  })
  @ApiProperty({ type: Boolean })
  isVerified: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  @ApiProperty({ type: Date })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  @ApiProperty({ type: Date })
  updatedAt?: Date;
}
