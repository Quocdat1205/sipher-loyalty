import { IsString } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ImageUrl } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

import { TransformLowercase } from "@utils/transfomers";

export enum AirdropType {
  NFT = "NFT",
  TOKEN = "TOKEN",
  MERCH = "MERCH",
  ALL = "ALL",
  OTHER = "OTHER",
}

@Entity()
export class Airdrop {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  @IsString()
  id: number;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  merkleRoot?: string;

  @ApiProperty({ type: String, isArray: true })
  @Column("character varying", { array: true })
  proof?: string[];

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  leaf?: string;

  @TransformLowercase()
  @ApiProperty({ type: String })
  @Column({ nullable: false })
  claimer?: string;

  @TransformLowercase()
  @ApiProperty({ type: String })
  @Column({ nullable: false })
  addressContract?: string;

  @ApiProperty({
    type: () => ImageUrl,
    isArray: true,
  })
  @OneToMany(() => ImageUrl, (imageUrls) => imageUrls.airdrop)
  imageUrls?: ImageUrl[];

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  totalAmount?: string;

  @ApiProperty({ type: String, enum: AirdropType, enumName: "AirdropType" })
  @Column({
    type: String,
  })
  type: AirdropType;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  startTime?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  vestingInterval?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  shortDescription?: string;

  @ApiProperty({ type: String, isArray: true })
  @Column("character varying", { array: true })
  description?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  numberOfVestingPoint?: string;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;
}
