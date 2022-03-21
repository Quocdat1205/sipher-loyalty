import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Merch {
  @PrimaryGeneratedColumn("uuid")
  id_merch?: string;

  @Column({ nullable: false })
  publicAddress: string;

  @Column({ default: "" })
  imageUrl?: string;

  @Column()
  title: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: false })
  isClaim: boolean;

  @Column({ nullable: false })
  promo_code: string;

  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
