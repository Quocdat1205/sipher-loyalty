import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum ShopifyCodeStatus {
  REDEEMED = "redeemed",
  AVAILABLE = "available",
  PENDING = "pending",
}
@Entity()
export class ShopifyCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    type: "enum",
    enum: ShopifyCodeStatus,
    default: ShopifyCodeStatus.AVAILABLE,
  })
  status: ShopifyCodeStatus;

  @Column({
    type: "character varying",
    nullable: true,
  })
  tokenId: string;

  @Column({
    type: "character varying",
    nullable: true,
  })
  ownerAddress: string;

  @Column({
    type: "character varying",
    nullable: true,
  })
  txHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
