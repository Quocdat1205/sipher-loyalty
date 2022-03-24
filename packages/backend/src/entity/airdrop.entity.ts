import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { Transaction } from "./transaction.entity";

export enum AirdropType {
  NFT = "NFT",
  TOKEN = "TOKEN",
  MERCH = "MERCH",
  ALL = "ALL",
}

@Entity()
export class Airdrop {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  merkleRoot: string;

  @ApiProperty({ type: String, isArray: true })
  @Column("character varying", { array: true })
  proof: string[];

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  leaf: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  claimer: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  addressContract: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  totalAmount: string;

  @ApiProperty({ type: String, enum: AirdropType, enumName: "AirdropType" })
  @Column({
    type: "enum",
    enum: AirdropType,
  })
  type: AirdropType;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  startTime: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  vestingInterval: string;

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  numberOfVestingPoint: string;

  @ApiProperty()
  @CreateDateColumn()
  created?: Date;
}

@Entity()
export class UserAirdrop {
  @PrimaryColumn()
  publicAddress: string;

  @Column()
  tier: string;
}

@Entity()
export class ItemOrder {
  @PrimaryGeneratedColumn("increment")
  id_item_order: number;

  @Column()
  id_order: string;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn("increment")
  id_item: number;

  @Column()
  name: string;

  @Column()
  id_tier: number;

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  @OneToOne(() => Transaction, (transaction) => transaction.item)
  transaction: Transaction;
}

@Entity()
export class Tier {
  @PrimaryGeneratedColumn("increment")
  id_tier: number;

  @Column()
  tier: string;
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id_order: string;

  @Column()
  publicAddress: string;

  @Column()
  state: string;
}

@Entity()
export class AddressUser {
  @PrimaryGeneratedColumn("increment")
  id_address_user: number;

  @Column()
  publicAddress: string;

  @Column()
  street_address: string;

  @Column()
  town: string;

  @Column()
  region: string;

  @Column()
  zipcode: string;
}

@Entity()
export class Receiver {
  @PrimaryGeneratedColumn("increment")
  id_receiver: number;

  @Column()
  publicAddress: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
