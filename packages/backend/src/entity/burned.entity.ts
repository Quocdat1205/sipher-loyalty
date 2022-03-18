import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum BurnType {
  Lootbox = "Lootbox",
  SpaceshipPart = "SpaceshipPart",
  Spaceship = "Spaceship",
}

@Entity()
export class Burned {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  to: string;

  @Column({ nullable: true, default: -1 })
  batchID?: number;

  @Column({ nullable: true, default: 0 })
  amount?: number;

  @Column("int", { array: true, default: [] })
  batchIDs?: number[];

  @Column("int", { array: true, default: [] })
  amounts?: number[];

  @Column({ nullable: false })
  salt: string;

  @Column({
    type: "enum",
    enum: BurnType,
  })
  type: BurnType;

  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}
