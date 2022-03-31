import {MigrationInterface, QueryRunner} from "typeorm";

export class test1648723449142 implements MigrationInterface {
    name = 'test1648723449142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "erc1155_lootbox_attribute" ("id" SERIAL NOT NULL, "trait_type" character varying NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "erc1155Id" integer, CONSTRAINT "PK_a98f82cbee5f7c2e22bf954298f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "erc1155_sculpture_attribute" ("id" SERIAL NOT NULL, "trait_type" character varying NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "erc1155Id" integer, CONSTRAINT "PK_2d1e10f03c0e7d5bfbd442b52b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lootbox" ("id" SERIAL NOT NULL, "publicAddress" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "tokenId" integer NOT NULL, "mintable" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "propertyLootboxId" integer, CONSTRAINT "PK_df79fe4dd2a98fb2756dbddd493" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "erc1155_lootbox" ("id" SERIAL NOT NULL, "tokenId" integer NOT NULL, "name" character varying NOT NULL, "shortDescription" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL DEFAULT '', "external_url" character varying NOT NULL DEFAULT 'https://sipher.xyz', "image" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_dee78353b4954921c94dbde1ac5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "erc1155_sculpture" ("id" SERIAL NOT NULL, "tokenId" integer NOT NULL, "name" character varying NOT NULL, "shortDescription" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL DEFAULT '', "external_url" character varying NOT NULL DEFAULT 'https://sipher.xyz', "image" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c2b6f1a17f994502fa7a3e53a6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "claimable_lootbox" ("id" SERIAL NOT NULL, "publicAddress" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "tokenId" integer NOT NULL, "expiredDate" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "propertyLootboxId" integer, CONSTRAINT "PK_77b7190f0846a5fef9a1b852225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "erc1155_lootbox_attribute" ADD CONSTRAINT "FK_e7b5c3a55eb444eec3e24f784d8" FOREIGN KEY ("erc1155Id") REFERENCES "erc1155_lootbox"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "erc1155_sculpture_attribute" ADD CONSTRAINT "FK_b15c11e5c1b43a737bbf9ce1611" FOREIGN KEY ("erc1155Id") REFERENCES "erc1155_sculpture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lootbox" ADD CONSTRAINT "FK_a446715addb861bea9efcfb31ab" FOREIGN KEY ("propertyLootboxId") REFERENCES "erc1155_lootbox"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "claimable_lootbox" ADD CONSTRAINT "FK_d5c9b1744420732aa301310debf" FOREIGN KEY ("propertyLootboxId") REFERENCES "erc1155_lootbox"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claimable_lootbox" DROP CONSTRAINT "FK_d5c9b1744420732aa301310debf"`);
        await queryRunner.query(`ALTER TABLE "lootbox" DROP CONSTRAINT "FK_a446715addb861bea9efcfb31ab"`);
        await queryRunner.query(`ALTER TABLE "erc1155_sculpture_attribute" DROP CONSTRAINT "FK_b15c11e5c1b43a737bbf9ce1611"`);
        await queryRunner.query(`ALTER TABLE "erc1155_lootbox_attribute" DROP CONSTRAINT "FK_e7b5c3a55eb444eec3e24f784d8"`);
        await queryRunner.query(`DROP TABLE "claimable_lootbox"`);
        await queryRunner.query(`DROP TABLE "erc1155_sculpture"`);
        await queryRunner.query(`DROP TABLE "erc1155_lootbox"`);
        await queryRunner.query(`DROP TABLE "lootbox"`);
        await queryRunner.query(`DROP TABLE "erc1155_sculpture_attribute"`);
        await queryRunner.query(`DROP TABLE "erc1155_lootbox_attribute"`);
    }

}
