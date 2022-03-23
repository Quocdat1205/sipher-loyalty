import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class S3 {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  s3_key: string;

  @Column()
  attachment: string;

  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
