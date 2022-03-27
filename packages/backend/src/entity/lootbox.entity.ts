import { IsEthereumAddress } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ERC1155Lootbox } from "./erc1155.entity";

@Entity()
export class Lootbox {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  @IsEthereumAddress()
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

  @ApiProperty({ type: Number })
  @Column({ default: 1 })
  mintable: number;

  @ApiProperty({ type: () => ERC1155Lootbox })
  @ManyToOne(
    () => ERC1155Lootbox,
    (PropertyLootbox) => PropertyLootbox.lootboxs
  )
  propertyLootbox?: ERC1155Lootbox;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}
