import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum BurnType {
  Lootbox = "Lootbox",
  SpaceshipPart = "SpaceshipPart",
  Spaceship = "Spaceship",
}

@Entity()
export class Burned {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  to: string;

  @ApiProperty({ type: Number })
  @Column({ nullable: true, default: -1 })
  batchID?: number;

  @ApiProperty({ type: Number })
  @Column({ nullable: true, default: 0 })
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
    type: "enum",
    enum: BurnType,
  })
  type: BurnType;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
