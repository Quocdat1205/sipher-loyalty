import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum AirdropType {
  NFT = "NFT",
  TOKEN = "TOKEN",
  MERCH = "MERCH",
}

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
  addressContract: string;

  @Column({ nullable: false })
  totalAmount: string;

  @Column({
    type: "enum",
    enum: AirdropType,
  })
  type: AirdropType;

  @Column({ nullable: false })
  startTime: string;

  @Column({ nullable: false })
  vestingInterval: string;

  @Column({ nullable: false })
  numberOfVestingPoint: string;

  @CreateDateColumn()
  created?: Date;
}
