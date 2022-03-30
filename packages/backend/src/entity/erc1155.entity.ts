import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  ClaimableLootbox,
  ERC1155LootboxAttribute,
  ERC1155SculptureAttribute,
  Lootbox,
} from "@entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class ERC1155Lootbox {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  tokenId: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ type: String })
  @Column({ default: "" })
  description: string;

  @ApiProperty({ type: String })
  @Column({ default: "https://sipher.xyz" })
  external_url: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  image: string;

  @ApiProperty({
    type: () => ERC1155LootboxAttribute,
    isArray: true,
  })
  @OneToMany(() => ERC1155LootboxAttribute, (attributes) => attributes.erc1155)
  attributes: ERC1155LootboxAttribute[];

  @ApiProperty({ type: () => Lootbox, isArray: true })
  @OneToMany(() => Lootbox, (Lootboxs) => Lootboxs.propertyLootbox)
  lootboxs?: Lootbox[];

  @ApiProperty({ type: () => ClaimableLootbox, isArray: true })
  @OneToMany(
    () => ClaimableLootbox,
    (ClaimableLootboxs) => ClaimableLootboxs.propertyLootbox
  )
  claimableLootboxs?: ClaimableLootbox[];

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;
}

@Entity()
export class ERC1155Sculpture {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  tokenId: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ type: String })
  @Column({ default: "" })
  description: string;

  @ApiProperty({ type: String })
  @Column({ default: "https://sipher.xyz" })
  external_url: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  image: string;

  @ApiProperty({ type: () => ERC1155SculptureAttribute, isArray: true })
  @OneToMany(
    () => ERC1155SculptureAttribute,
    (attributes) => attributes.erc1155
  )
  attributes: ERC1155SculptureAttribute[];

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;
}
