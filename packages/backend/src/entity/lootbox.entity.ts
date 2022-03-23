import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Lootbox {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  publicAddress: string;

  @ApiProperty({ type: Number })
  @Column({ default: 1 })
  quantity: number;

  @ApiProperty({ type: Number })
  @Column({ nullable: false })
  tokenId: number;

  @ApiProperty({ type: Number })
  @Column({ default: 0 })
  pending: number;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}
