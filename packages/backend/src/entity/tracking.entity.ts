import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class TrackedBlock {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  type: string;

  @Column({ default: 0 })
  tracked: number;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;
}
