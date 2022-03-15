import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Airdrop {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  merkleRoot: string;

  @Column("character varying", { array: true })
  proof: string[];

  @Column({ nullable: false })
  leaf: string;

  @Column({ nullable: false })
  claimer: string;

  @Column({ nullable: false })
  campaignCode: string;

  @Column({ nullable: false })
  totalAmount: string;

  @Column({ nullable: false })
  startTime: string;

  @Column({ nullable: false })
  vestingInterval: string;

  @Column({ nullable: false })
  numberOfVestingPoint: string;

  @CreateDateColumn()
  created?: Date;
}
