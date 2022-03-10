import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

export enum MintStatus {
  Pending = "Pending",
  Minted = "Minted",
}

export enum MintType {
  Lootbox = "Lootbox",
  SpaceshipPart = "SpaceshipPart",
  Spaceship = "Spaceship",
}

@Entity()
export class PendingMint {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  to: string

  @Column({ nullable: false })
  batchID: number

  @Column({ nullable: false })
  amount: number

  @Column("int", { array: true, default: [] })
  batchIDs: number[]

  @Column("int", { array: true, default: [] })
  amounts: number[]

  @Column({ nullable: false })
  salt: string

  @Column({
    type: "enum",
    enum: MintStatus,
    default: MintStatus.Pending,
  })
  status: MintStatus

  @Column({
    type: "enum",
    enum: MintType,
  })
  type: MintType

  @Column({ nullable: false })
  signature: string

  @CreateDateColumn({ default: new Date() })
  createdAt: Date
}
