import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Merch {
  @PrimaryGeneratedColumn("uuid")
  id_merch: string;

  @Column()
  publicAddress: string;

  @Column()
  attachment: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isClaim: boolean;

  @Column()
  promo_code: string;

  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
