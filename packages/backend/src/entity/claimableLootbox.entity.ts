import { Transform } from "class-transformer";
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
export class ClaimableLootbox {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn("increment")
  id?: string;

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

  @ApiProperty({ type: () => ERC1155Lootbox })
  @ManyToOne(
    () => ERC1155Lootbox,
    (PropertyLootbox) => PropertyLootbox.claimableLootboxs
  )
  propertyLootbox?: ERC1155Lootbox;

  @ApiProperty()
  @Column({ type: "timestamptz", nullable: true })
  @Transform(({ value }) => new Date(value))
  expiredDate: Date;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
