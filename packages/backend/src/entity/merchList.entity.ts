import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { Item } from "./item.entity";

@Entity()
export class MerchList {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id_merch_list: number;

  @ApiProperty({ type: String })
  @Column()
  publicAddress: string;

  @ApiProperty({ type: String })
  @Column()
  tier: string;

  @ApiProperty({ type: String })
  @Column()
  merch_item: string;

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
  @ManyToOne(() => Item, (item) => item.merchList)
  item: Item;
}
