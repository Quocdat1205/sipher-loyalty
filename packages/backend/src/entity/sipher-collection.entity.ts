import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    type: "character varying",
  })
  name: string;

  @Column({
    type: "character varying",
  })
  collectionSlug: string;

  @Column({
    type: "character varying",
  })
  contractAddress: string;

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
}
