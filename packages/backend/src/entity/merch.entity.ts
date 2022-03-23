import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Merch {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn("uuid")
  id_merch?: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  publicAddress: string;

  @ApiProperty({ type: String })
  @Column({ default: "" })
  imageUrl?: string;

  @ApiProperty({ type: String })
  @Column()
  title: string;

  @ApiProperty({ type: String })
  @Column({ default: "" })
  description: string;

  @ApiProperty({ type: Boolean })
  @Column({ default: false })
  isClaim: boolean;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  promo_code: string;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
