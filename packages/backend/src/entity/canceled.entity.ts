import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum CancelType {
  Lootbox = "Lootbox",
  SpaceshipPart = "SpaceshipPart",
  Spaceship = "Spaceship",
}

@Entity()
export class Canceled {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  signature: string;

  @ApiProperty({
    type: String,
    enum: CancelType,
    enumName: "CancelType",
  })
  @Column({
    type: String,
  })
  type: CancelType;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz", default: new Date() })
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamptz", default: new Date() })
  updatedAt?: Date;
}
