import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum AirdropType {
  NFT = "NFT",
  TOKEN = "TOKEN",
  MERCH = "MERCH",
  ALL = "ALL",
}

@Entity()
export class Airdrop {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string;

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
  addressContract: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  totalAmount: string;

  @ApiProperty({ type: AirdropType })
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
  @Column({ nullable: false })
  numberOfVestingPoint: string;

  @ApiProperty()
  @CreateDateColumn()
  created?: Date;
}
