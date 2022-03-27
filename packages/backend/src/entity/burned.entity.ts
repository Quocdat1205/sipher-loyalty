import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum BurnType {
  Lootbox = "Lootbox",
  SpaceshipPart = "SpaceshipPart",
  Spaceship = "Spaceship",
}

@Entity()
export class Burned {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id?: number;

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

  @ApiProperty({
    type: String,
    enum: BurnType,
    enumName: "BurnType",
  })
  @Column({
    type: String,
  })
  type: BurnType;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;
}
