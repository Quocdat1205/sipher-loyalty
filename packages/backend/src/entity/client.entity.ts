import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity()
export class Lootbox {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: false })
  publicAddress: string

  @Column({ default: 1 })
  quantity: number

  @Column({ nullable: false })
  typeId: number

  @CreateDateColumn({ default: new Date() })
  createdAt: Date
}

@Entity()
export class User {
  @PrimaryColumn()
  publicAddress: string

  @Column({ nullable: true })
  email: string

  @Column({ default: 0, nullable: true })
  xp_point: number

  @Column({ default: 0, nullable: true })
  nano_point: number

  @Column({ nullable: true })
  username: string

  @Column({ nullable: true })
  id_discord: number

  @Column()
  nonce: number

  @Column({ nullable: true, default: "" })
  attachment: string

  @Column({ nullable: true, default: "" })
  bio: string

  @Column({ default: "bronze" })
  tier: string

  @CreateDateColumn({ default: new Date() })
  createdAt: Date

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id_address: string

  @Column()
  publicAddress: string

  @Column()
  fullname: string

  @Column()
  phone: string

  @Column()
  address: string

  @Column()
  isDefault: boolean

  @Column()
  type: string

  @CreateDateColumn({ default: new Date() })
  createdAt: Date
}

@Entity()
export class TransactionLogs {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column()
  publicAddress: string

  @Column()
  type: string

  @Column()
  quantity: number

  @Column()
  priceEth: number

  @Column()
  priceUsd: number

  @CreateDateColumn({ default: new Date() })
  createdAt: Date
}

@Entity()
export class ActivityLogs {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column()
  publicAddress: string

  @Column()
  category: string

  @Column()
  activity: string

  @Column()
  status: string

  @CreateDateColumn({ default: new Date() })
  createdAt: Date
}

@Entity()
export class NftOrder {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column()
  id_sculpture: string

  @Column()
  name_nft: string

  @Column()
  id_nft: string
}

@Entity()
export class SculpturesOrder {
  @PrimaryGeneratedColumn("uuid")
  id_program: string

  @Column()
  publicAddress: string

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  email: string

  @Column()
  street_address: string

  @Column()
  town_city: string

  @Column()
  country: string

  @Column()
  zip_code: string

  @Column()
  tracking_link: string

  @Column()
  shipping_fee: number

  @Column()
  status: string

  // @OneToMany(type => NftOrder, nft => nft.id_sculpture)
  // nft: NftOrder[]

  @CreateDateColumn()
  createdAt: Date
}
