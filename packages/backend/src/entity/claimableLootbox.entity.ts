import { Transform } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ClaimableLootbox {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({ nullable: false })
  publicAddress: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ nullable: false })
  tokenId: number;

  @Column({ type: "timestamp", nullable: true })
  @Transform(({ value }) => new Date(value))
  expiredDate: Date;

  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
