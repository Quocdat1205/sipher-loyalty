import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class ClaimableLootbox {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  publicAddress: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ nullable: false })
  tokenId: number;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}
