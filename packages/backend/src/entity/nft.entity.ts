import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class NftCurrentEmotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nftId: number;

  @Column({ nullable: false })
  race: string;

  @Column({ nullable: false })
  emotion: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class NftProperty {
  @PrimaryColumn()
  name: string;

  @Column({ nullable: false })
  nftId: number;

  @Column()
  origin: string;

  @Column()
  race: string;

  @Column()
  score: number;

  @Column()
  rank: number;

  @Column()
  image: string;

  @OneToMany(() => NftAttribute, (attr) => attr.nftProp)
  attributes: NftAttribute[];

  @OneToMany(() => NftEmotion, (emo) => emo.nftProp)
  emotions: NftEmotion[];

  @OneToMany(() => NftProof, (proof) => proof.nftProp)
  proofs: NftProof[];
}

@Entity()
export class NftAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  traitType: string;

  @Column()
  value: string;

  @ManyToOne(() => NftProperty, (nft) => nft.attributes)
  @Index()
  nftProp: NftProperty;
}

@Entity()
export class NftEmotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emotion: string;

  @Column()
  image: string;

  @ManyToOne(() => NftProperty, (nft) => nft.emotions)
  @Index()
  nftProp: NftProperty;
}

@Entity()
export class NftAttributeRarity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  race: string;

  @Column()
  traitType: string;

  @Column()
  value: string;

  @Column()
  total: number;
}

@Entity()
export class NftProof {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => NftProperty, (nft) => nft.proofs)
  @Index()
  nftProp: NftProperty;
}
