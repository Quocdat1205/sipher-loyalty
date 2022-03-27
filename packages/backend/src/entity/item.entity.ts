import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ImageUrl } from "./imageUrl.entity";

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
  Card = "SIPHER Exclusive Thank You Card",
}

@Entity()
export class Item {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id_merch: number;

  @ApiProperty({
    type: String,
    enum: ItemType,
    enumName: "ItemType",
  })
  @Column({
    type: "enum",
    enum: ItemType,
  })
  merch_item: ItemType;

  @ApiProperty({ type: String, enum: ViewType, enumName: "ViewType" })
  @Column({
    type: "enum",
    enum: ViewType,
  })
  name: ViewType;

  @ApiProperty({ type: String })
  @Column()
  description: string;

  @ApiProperty({
    type: () => ImageUrl,
    isArray: true,
  })
  @OneToMany(() => ImageUrl, (imageUrls) => imageUrls.item)
  imageUrls?: ImageUrl[];
}
