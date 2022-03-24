import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum CancelType {
  Lootbox = "Lootbox",
  SpaceshipPart = "SpaceshipPart",
  Spaceship = "Spaceship",
}

@Entity()
export class Canceled {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  signature: string;

  @ApiProperty({
    type: String,
    enum: CancelType,
    enumName: "CancelType",
  })
  @Column({
    type: "enum",
    enum: CancelType,
  })
  type: CancelType;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
