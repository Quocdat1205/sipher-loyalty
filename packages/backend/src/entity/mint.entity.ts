import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { TransformLowercase } from "@utils/transfomers";

export enum MintStatus {
  Minting = "Minting",
  Minted = "Minted",
  Canceled = "Canceled",
  Expired = "Expired",
  Error = "Error",
  Reject = "Rejected",
}

export enum MintType {
  Lootbox = "Lootbox",
  SpaceshipPart = "SpaceshipPart",
  Spaceship = "Spaceship",
}

@Entity()
export class PendingMint {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @TransformLowercase()
  @ApiProperty({ type: String })
  @Column({ nullable: false })
  to: string;

  @ApiProperty({ type: Number })
  @Column({ nullable: true })
  batchID?: number;

  @ApiProperty({ type: Number })
  @Column({ nullable: true })
  amount?: number;

  @ApiProperty({ type: Number, isArray: true })
  @Column("int", { array: true, default: [] })
  batchIDs?: number[];

  @ApiProperty({ type: Number, isArray: true })
  @Column("int", { array: true, default: [] })
  amounts?: number[];

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  salt: string;

  @ApiProperty({ type: Number })
  @Column({ nullable: false, default: 0 })
  deadline: number;

  @ApiProperty({ type: String, enum: MintStatus, enumName: "MintStatus" })
  @Column({
    type: String,
    default: MintStatus.Minting,
  })
  status: MintStatus;

  @ApiProperty({ type: String, enum: MintType, enumName: "MintType" })
  @Column({
    type: String,
  })
  type: MintType;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  signature: string;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;
}
