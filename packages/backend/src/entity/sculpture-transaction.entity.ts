import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { TransformLowercase } from "@utils/transfomers";

@Entity()
export class SculptureTransaction {
  @ApiProperty({ type: String })
  @PrimaryColumn()
  id: string;

  @ApiProperty({ type: String })
  @Column({
    type: "character varying",
  })
  event: string;

  @ApiProperty({ type: String })
  @Column({
    type: "character varying",
    nullable: true,
  })
  tokenId: string;

  @ApiProperty({ type: Number })
  @Column({
    type: "integer",
  })
  amount: number;

  @TransformLowercase()
  @ApiProperty({ type: String })
  @Column({
    type: "character varying",
    nullable: true,
  })
  ownerAddress: string;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt?: Date;
}
