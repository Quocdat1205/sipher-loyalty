import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ERC1155Lootbox, ERC1155Sculpture } from "./erc1155.entity";

@Entity()
export class ERC1155LootboxAttribute {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ type: String })
  @Column()
  trait_type: string;

  @ApiProperty({ type: String })
  @Column()
  value: string;

  @ApiProperty({ type: () => ERC1155Lootbox })
  @ManyToOne(() => ERC1155Lootbox, (erc1155) => erc1155.attributes)
  erc1155: ERC1155Lootbox;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz", default: new Date() })
  createdAt: Date;
}

@Entity()
export class ERC1155SculptureAttribute {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ type: String })
  @Column()
  trait_type: string;

  @ApiProperty({ type: String })
  @Column()
  value: string;

  @ApiProperty({ type: () => ERC1155Sculpture })
  @ManyToOne(() => ERC1155Sculpture, (erc1155) => erc1155.attributes)
  erc1155: ERC1155Sculpture;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz", default: new Date() })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamptz", default: new Date() })
  updatedAt?: Date;
}
