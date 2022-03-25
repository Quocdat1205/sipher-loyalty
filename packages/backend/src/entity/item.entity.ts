import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

export type ItemType = "Boomer" | "Hoodie" | "Tshirt" | "Hat";

export type viewType =
  | "SIPHER Exclusive Bomber"
  | "SIPHER Exclusive Hoodie"
  | "SIPHER Exclusive T-shirt"
  | "SIPHER Exclusive Hat";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("increment")
  id_merch: number;

  @ApiProperty({
    type: String,
    enum: ["Boomer", "Hoodie", "Tshirt", "Hat"],
    enumName: "ItemType",
  })
  @Column({
    type: "enum",
    enum: ["Boomer", "Hoodie", "Tshirt", "Hat"],
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
  view: viewType;
}
