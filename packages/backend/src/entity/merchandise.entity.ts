import {
  IsBoolean,
  IsEnum,
  IsEthereumAddress,
  IsNumber,
  IsString,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { TransformLowercase } from "@utils/transfomers";

import { Item, ItemType } from "./item.entity";

@Entity()
export class Merchandise {
  @ApiProperty({ type: Number })
  @IsNumber()
  @PrimaryGeneratedColumn("increment")
  id: number;

  @TransformLowercase()
  @ApiProperty({ type: String })
  @IsEthereumAddress()
  @Column()
  publicAddress: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column()
  tier?: string;

  @ApiProperty({ type: String, enum: ItemType, enumName: "ItemType" })
  @IsEnum(ItemType)
  @Column({
    type: String,
  })
  merchItem: ItemType;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Column()
  quantity: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Column()
  quantityShipped: number;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @Column({ default: false })
  isShipped?: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @Column({ default: false })
  shippable?: boolean;

  @ApiProperty({ type: () => Item })
  @ManyToOne(() => Item, (item) => item.merchandise)
  item?: Item;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;
}
