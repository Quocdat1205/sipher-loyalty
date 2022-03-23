import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClaimableLootbox } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

import {
  ERC1155LootboxAttribute,
  ERC1155SculptureAttribute,
} from "./erc1155Attributes.entity";
import { Lootbox } from "./lootbox.entity";

@Entity()
export class ERC1155Lootbox {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string;

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
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}

@Entity()
export class ERC1155Sculpture {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string;

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
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}
