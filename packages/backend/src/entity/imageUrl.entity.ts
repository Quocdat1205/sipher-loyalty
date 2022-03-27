import { IsString } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Item } from "@entity";
import { ApiProperty } from "@nestjs/swagger";

import { Airdrop } from "./airdrop.entity";

@Entity()
export class ImageUrl {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  @IsString()
  id: number;

  @ApiProperty({ type: String })
  @Column({ nullable: true, default: "" })
  color: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true, default: "" })
  default?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true, default: "" })
  front?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true, default: "" })
  back?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true, default: "" })
  left?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true, default: "" })
  right?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true, default: "" })
  top?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true, default: "" })
  bot?: string;

  @ApiProperty({ type: () => Airdrop })
  @ManyToOne(() => Airdrop, (air) => air.imageUrls)
  airdrop: Airdrop;

  @ApiProperty({ type: () => Item })
  @ManyToOne(() => Item, (item) => item.imageUrls)
  item: Item;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;
}
