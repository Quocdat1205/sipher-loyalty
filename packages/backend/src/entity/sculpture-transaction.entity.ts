import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class SculptureTransaction {
  @PrimaryColumn()
  id: string;

  @Column({
    type: "character varying",
  })
  event: string;

  @Column({
    type: "character varying",
    nullable: true,
  })
  tokenId: string;

  @Column({
    type: "integer",
  })
  amount: number;

  @Column({
    type: "character varying",
    nullable: true,
  })
  ownerAddress: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
