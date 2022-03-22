import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import {
  ERC1155SculptureAttribute,
  ERC1155SpaceShipPartLootboxAttribute,
} from "./erc1155Attributes.entity";
import { Lootbox } from "./lootbox.entity";

@Entity()
export class ERC1155SpaceShipPartLootbox {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  tokenId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: "https://sipher.xyz" })
  external_url: string;

  @Column({ nullable: false })
  image: string;

  @OneToMany(
    () => ERC1155SpaceShipPartLootboxAttribute,
    (attributes) => attributes.erc1155
  )
  attributes: ERC1155SpaceShipPartLootboxAttribute[];

  @OneToMany(() => Lootbox, (Lootboxs) => Lootboxs.propertyLootbox)
  lootboxs?: Lootbox[];

  @OneToMany(
    () => Lootbox,
    (ClaimableLootboxs) => ClaimableLootboxs.propertyLootbox
  )
  claimableLootboxs?: Lootbox[];

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}

@Entity()
export class ERC1155Sculpture {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  tokenId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: "https://sipher.xyz" })
  external_url: string;

  @Column({ nullable: false })
  image: string;

  @OneToMany(
    () => ERC1155SculptureAttribute,
    (attributes) => attributes.erc1155
  )
  attributes: ERC1155SculptureAttribute[];

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}
