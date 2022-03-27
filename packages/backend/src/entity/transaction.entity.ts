import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Transaction {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id_transaction: number;

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
}
