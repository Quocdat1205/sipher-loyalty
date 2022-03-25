import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export enum CollectionType {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export enum CollectionCategory {
  CHARACTER = "character",
  SCULPTURE = "sculpture",
  LOOTBOXE = "lootbox",
  SPACESHIP = "spaceship",
}

@Entity()
export class SipherCollection {
  @PrimaryColumn()
  id: string;

  @Column({
    type: "character varying",
  })
  name: string;

  @Column({
    type: "character varying",
  })
  collectionSlug: string;

  @Column({ type: "integer" })
  chainId: number;

  @Column({
    type: "enum",
    enum: CollectionType,
    default: CollectionType.ERC721,
  })
  collectionType: CollectionType;

  @Column({
    type: "enum",
    enum: CollectionCategory,
    default: CollectionCategory.CHARACTER,
  })
  category: CollectionCategory;

  @Column({
    type: "decimal",
    nullable: true,
  })
  floorPrice: number;

  @Column({
    type: "text",
    default: "",
  })
  description: string;

  @Column({
    type: "character varying",
  })
  logoImage: string;

  @Column({
    type: "character varying",
  })
  bannerImage: string;

  @Column({
    type: "character varying",
  })
  siteUrl: string;

  @Column({
    type: "boolean",
  })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
