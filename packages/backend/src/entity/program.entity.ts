import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Program {
  @PrimaryGeneratedColumn("uuid")
  id_program: string;

  @Column({ nullable: true })
  content: string;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @Column()
  publishedAt: Date;

  @Column()
  expired: Date;
}
