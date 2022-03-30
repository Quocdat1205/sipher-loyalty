import { IsNumber, IsString } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { Airdrop } from "@entity";
import { Item } from "@entity";

@Entity()
export class ImageUrl {
  @ApiProperty({ type: Number })
  @IsNumber()
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({ type: String })
  @IsString()
  @Column({ nullable: true, default: "" })
  color: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column({ nullable: true, default: "" })
  default?: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column({ nullable: true, default: "" })
  front?: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column({ nullable: true, default: "" })
  back?: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column({ nullable: true, default: "" })
  left?: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column({ nullable: true, default: "" })
  right?: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column({ nullable: true, default: "" })
  top?: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column({ nullable: true, default: "" })
  bot?: string;

  @ApiProperty({ type: () => Airdrop })
  @ManyToOne(() => Airdrop, (air) => air.imageUrls)
  airdrop: Airdrop;

  @ApiProperty({ type: () => Item })
  @ManyToOne(() => Item, (item) => item.imageUrls)
  item: Item;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;
}
