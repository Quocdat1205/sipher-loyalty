import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class PendingMint {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  to: string

  @Column("int", { array: true })
  batchID: number[]

  @Column("int", { array: true })
  amount: number[]

  @Column({ nullable: false })
  salt: string

  @Column({ nullable: false })
  signature: string

  @CreateDateColumn({ default: new Date() })
  createdAt: Date
}
