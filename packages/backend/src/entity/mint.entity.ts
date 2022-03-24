import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum MintStatus {
  Pending = "Pending",
  Minted = "Minted",
  Canceled = "Canceled",
}

export enum MintType {
  Lootbox = "Lootbox",
  SpaceshipPart = "SpaceshipPart",
  Spaceship = "Spaceship",
}

@Entity()
export class PendingMint {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string;

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
    type: "enum",
    enum: MintStatus,
    default: MintStatus.Pending,
  })
  status: MintStatus;

  @ApiProperty({ type: String, enum: MintType, enumName: "MintType" })
  @Column({
    type: "enum",
    enum: MintType,
  })
  type: MintType;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  signature: string;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}
