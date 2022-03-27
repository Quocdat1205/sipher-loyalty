import { IsEthereumAddress, IsString } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ImageUrl } from "./imageUrl.entity";

export enum AirdropType {
  NFT = "NFT",
  TOKEN = "TOKEN",
  MERCH = "MERCH",
  ALL = "ALL",
  CARD = "CARD",
}

@Entity()
export class Airdrop {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  @IsString()
  id: number;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  merkleRoot: string;

  @ApiProperty({ type: String, isArray: true })
  @Column("character varying", { array: true })
  proof: string[];

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  leaf: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  claimer: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  @IsEthereumAddress()
  addressContract: string;

  @ApiProperty({
    type: () => ImageUrl,
    isArray: true,
  })
  @OneToMany(() => ImageUrl, (imageUrls) => imageUrls.airdrop)
  imageUrls?: ImageUrl[];

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  totalAmount: string;

  @ApiProperty({ type: String, enum: AirdropType, enumName: "AirdropType" })
  @Column({
    type: "enum",
    enum: AirdropType,
  })
  type: AirdropType;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  startTime: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  vestingInterval: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  numberOfVestingPoint: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;
}
