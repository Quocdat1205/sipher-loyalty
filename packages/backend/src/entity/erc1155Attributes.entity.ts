import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import {
  ERC1155Sculpture,
  ERC1155SpaceShipPartLootbox,
} from "./erc1155.entity";

@Entity()
export class ERC1155SpaceShipPartLootboxAttribute {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  trait_type: string;

  @Column()
  value: string;

  @ManyToOne(() => ERC1155SpaceShipPartLootbox, (erc1155) => erc1155.attributes)
  erc1155: ERC1155SpaceShipPartLootbox;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}

@Entity()
export class ERC1155SculptureAttribute {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  trait_type: string;

  @Column()
  value: string;

  @ManyToOne(() => ERC1155Sculpture, (erc1155) => erc1155.attributes)
  erc1155: ERC1155Sculpture;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}
