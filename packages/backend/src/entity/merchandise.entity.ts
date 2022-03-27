import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { Item, ItemType } from "./item.entity";

@Entity()
export class Merchandise {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @ApiProperty({ type: String })
  @Column()
  publicAddress: string;

  @ApiProperty({ type: String })
  @Column()
  tier?: string;

  @ApiProperty({
    type: String,
  })
  @Column({
    type: String,
  })
  merch_item: ItemType;

  @ApiProperty({ type: Number })
  @Column()
  quantity: number;

  @ApiProperty({ type: Number })
  @Column()
  quantity_shipped: number;

  @ApiProperty({ type: Boolean })
  @Column({ default: false })
  isShipped?: boolean;

  @ApiProperty({ type: Boolean })
  @Column({ default: false })
  isShip?: boolean;

  @ApiProperty({ type: () => Item })
  @ManyToOne(() => Item, (item) => item.merchandise)
  item?: Item;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({ default: new Date() })
  updatedAt?: Date;
}
