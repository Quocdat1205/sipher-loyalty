import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Item } from "./airdrop.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("increment")
  id_transaction: number;

  @Column()
  publicAddress: string;

  @OneToOne(() => Item, (item) => item.transaction)
  @JoinColumn({ name: "id_item" })
  item: Item;

  @Column()
  quantity: number;

  @Column()
  quantity_shipped: number;

  @Column()
  isShipped: boolean;
}
