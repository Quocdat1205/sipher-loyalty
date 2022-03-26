import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class ItemOrder {
  @PrimaryGeneratedColumn("increment")
  id_item_order: number;

  @Column()
  id_order: string;

  @ApiProperty({ type: String })
  @Column()
  size?: string;

  @ApiProperty({ type: String })
  @Column()
  color?: string;

  @ApiProperty({ type: Number })
  @Column()
  quantity: number;

  @Column()
  id_transaction: string;
}
