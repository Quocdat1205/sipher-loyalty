import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class ItemOrder {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id_item_order: number;

  @ApiProperty({ type: String })
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

  @ApiProperty({ type: String })
  @Column()
  id_transaction: string;
}
