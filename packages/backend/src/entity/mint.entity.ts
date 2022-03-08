import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class PendingMint {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  to: string

  @Column({ nullable: false, array: true })
  batchID: number[]

  @Column({ nullable: false })
  amount: number[]

  @Column({ nullable: false })
  salt: string

  @Column({ nullable: false })
  signature: string

  @CreateDateColumn({ default: new Date() })
  createdAt: Date
}
