import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Address {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn("increment")
  id_address: number;

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
