import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { AirdropType } from "./airdrop.entity";
import { ImageUrl } from "./imageUrl.entity";
import { Merchandise } from "./merchandise.entity";

export enum ItemType {
  Bomber = "Bomber",
  Hoodie = "Hoodie",
  Tshirt = "Tshirt",
  Hat = "Hat",
  Card = "Card",
}

export enum ViewType {
  Bomber = "SIPHER Exclusive Bomber",
  Hoodie = "SIPHER Exclusive Hoodie",
  Tshirt = "SIPHER Exclusive T-shirt",
  Hat = "SIPHER Exclusive Hat",
  Card = "Thank You Card",
}

@Entity()
export class Item {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({
    type: String,
    enum: ItemType,
    enumName: "ItemType",
  })
  @Column({
    type: String,
  })
  merch_item: ItemType;

  @ApiProperty({ type: String, enum: ViewType, enumName: "ViewType" })
  @Column({
    type: String,
  })
  name: ViewType;

  @ApiProperty({ type: String, enum: AirdropType, enumName: "AirdropType" })
  @Column({
    type: String,
  })
  type: AirdropType;

  @ApiProperty({ type: String })
  @Column()
  description: string;

  @ApiProperty({
    type: () => ImageUrl,
    isArray: true,
  })
  @OneToMany(() => ImageUrl, (imageUrls) => imageUrls.item)
  imageUrls?: ImageUrl[];

  @ApiProperty({
    type: () => Merchandise,
    isArray: true,
  })
  @OneToMany(() => Merchandise, (merchandise) => merchandise.item)
  merchandise?: Merchandise[];

  @ApiProperty({ type: String, isArray: true, default: [], nullable: true })
  @Column("character varying", { array: true, default: [], nullable: true })
  size?: string[];

  @ApiProperty({ type: String, isArray: true, default: [], nullable: true })
  @Column("character varying", { array: true, default: [], nullable: true })
  color?: string[];

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;
}
