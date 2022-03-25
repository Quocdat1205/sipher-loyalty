import { isEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Receiver {
  @PrimaryGeneratedColumn("uuid")
  id_receiver: string;

  @ApiProperty({ type: String })
  @Column()
  publicAddress: string;

  @ApiProperty({ type: String })
  @Column()
  first_name: string;

  @ApiProperty({ type: String })
  @Column()
  last_name: string;

  @ApiProperty({ type: isEmail })
  @Column()
  email: string;

  @ApiProperty({ type: String })
  @Column()
  phone: string;
}
