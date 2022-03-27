import { IsEthereumAddress } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Order {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id_order: number;

  @ApiProperty({ type: String })
  @IsEthereumAddress()
  @Column()
  publicAddress: string;

  @ApiProperty({ type: String })
  @Column()
  id_address: string;

  @ApiProperty({ type: String })
  @Column()
  id_receiver: string;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
