import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  ather_id: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  email: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  attachment: string;

  @ApiProperty({ type: String })
  @Column({ default: "" })
  username: string;

  @ApiProperty({ type: String })
  @Column({ nullable: true })
  bio: string;

  @ApiProperty()
  @Column({ default: new Date() })
  last_active: Date;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt?: Date;
}

@Entity()
export class Address {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn("uuid")
  id_address: string;

  @ApiProperty({ type: String })
  @Column()
  publicAddress: string;

  @ApiProperty({ type: String })
  @Column()
  street_address: string;

  @ApiProperty({ type: String })
  @Column()
  town: string;

  @ApiProperty({ type: String })
  @Column()
  country: string;

  @ApiProperty({ type: String })
  @Column()
  state: string;

  @ApiProperty({ type: String })
  @Column()
  zip_code: string;
}
