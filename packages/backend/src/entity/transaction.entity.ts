import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("increment")
  id_transaction: number;

  @Column()
  publicAddress: string;

  @Column()
  tier: string;

  @Column()
  merch_item: string;

  @Column()
  quantity: number;

  @Column()
  quantity_shipped: number;

  @Column({ default: false })
  isShipped?: boolean;
}
