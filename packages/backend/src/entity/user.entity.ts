import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  ather_id: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  attachment: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ default: new Date() })
  last_active: Date;

  @CreateDateColumn()
  createdAt?: Date;
}
