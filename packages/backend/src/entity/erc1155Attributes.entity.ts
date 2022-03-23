import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import {
  ERC1155Sculpture,
  ERC1155SpaceShipPartLootbox,
} from "./erc1155.entity";

@Entity()
export class ERC1155SpaceShipPartLootboxAttribute {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn("increment")
  id: string;

  @ApiProperty({ type: String })
  @Column()
  trait_type: string;

  @ApiProperty({ type: String })
  @Column()
  value: string;

  @ApiProperty({ type: () => ERC1155SpaceShipPartLootbox })
  @ManyToOne(() => ERC1155SpaceShipPartLootbox, (erc1155) => erc1155.attributes)
  erc1155: ERC1155SpaceShipPartLootbox;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}

@Entity()
export class ERC1155SculptureAttribute {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn("increment")
  id: string;

  @ApiProperty({ type: String })
  @Column()
  trait_type: string;

  @ApiProperty({ type: String })
  @Column()
  value: string;

  @ApiProperty({ type: () => ERC1155SpaceShipPartLootbox })
  @ManyToOne(() => ERC1155Sculpture, (erc1155) => erc1155.attributes)
  erc1155: ERC1155Sculpture;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}
