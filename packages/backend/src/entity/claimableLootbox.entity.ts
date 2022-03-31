import { Transform } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { TransformLowercase } from "@utils/transfomers";

import { ERC1155Lootbox } from "./erc1155.entity";

@Entity()
export class ClaimableLootbox {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @TransformLowercase()
  @ApiProperty({ type: String })
  @Column({ nullable: false })
  publicAddress: string;

  @ApiProperty({ type: Number })
  @Column({ default: 1 })
  quantity: number;

  @ApiProperty({ type: Number })
  @Column({ nullable: false })
  tokenId: number;

  @ApiProperty({ type: () => ERC1155Lootbox })
  @ManyToOne(
    () => ERC1155Lootbox,
    (PropertyLootbox) => PropertyLootbox.claimableLootboxs
  )
  propertyLootbox?: ERC1155Lootbox;

  @ApiProperty()
  @Column()
  expiredDate: number;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;
}
