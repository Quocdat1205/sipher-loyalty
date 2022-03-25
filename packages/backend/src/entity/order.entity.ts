import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id_order: string;

  @ApiProperty({ type: String })
  @Column()
  publicAddress: string;

  @ApiProperty({ type: String })
  @Column()
  id_address: string;

  @ApiProperty({ type: String })
  @Column()
  id_receiver: string;

  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
