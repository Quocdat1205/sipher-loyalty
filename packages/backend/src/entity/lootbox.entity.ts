import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ERC1155SpaceShipPartLootbox } from "./erc1155.entity";

@Entity()
export class Lootbox {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  publicAddress: string;

  @ApiProperty({ type: Number })
  @Column({ default: 1 })
  quantity: number;

  @ApiProperty({ type: Number })
  @Column({ nullable: false })
  tokenId: number;

  @ApiProperty({ type: Number })
  @Column({ default: 0 })
  pending: number;

  @ManyToOne(
    () => ERC1155SpaceShipPartLootbox,
    (PropertyLootbox) => PropertyLootbox.lootboxs
  )
  propertyLootbox?: ERC1155SpaceShipPartLootbox;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}
