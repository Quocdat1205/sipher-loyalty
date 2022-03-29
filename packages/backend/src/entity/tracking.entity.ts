import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class TrackedBlock {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  type: string;

  @Column({ default: 0 })
  tracked: number;

  @CreateDateColumn({ type: "timestamptz", default: new Date() })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz", default: new Date() })
  updatedAt?: Date;
}
