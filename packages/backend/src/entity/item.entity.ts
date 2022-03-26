import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export enum ItemType {
  Bomber = "Bomber",
  Hoodie = "Hoodie",
  Tshirt = "Tshirt",
  Hat = "Hat",
}

export enum ViewType {
  Bomber = "SIPHER Exclusive Bomber",
  Hoodie = "SIPHER Exclusive Hoodie",
  Tshirt = "SIPHER Exclusive T-shirt",
  Hat = "SIPHER Exclusive Hat",
}

@Entity()
export class Item {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id_merch: number;

  @ApiProperty({
    type: String,
    enum: ["Bomber", "Hoodie", "Tshirt", "Hat"],
    enumName: "ItemType",
  })
  @Column({
    type: "enum",
    enum: ["Bomber", "Hoodie", "Tshirt", "Hat"],
  })
  merch_item: ItemType;

  @ApiProperty({ type: String })
  @Column({
    type: "enum",
    enum: [
      "SIPHER Exclusive Bomber",
      "SIPHER Exclusive Hoodie",
      "SIPHER Exclusive T-shirt",
      "SIPHER Exclusive Hat",
    ],
  })
  name: ViewType;

  @ApiProperty({ type: String })
  @Column()
  description: string;
}
