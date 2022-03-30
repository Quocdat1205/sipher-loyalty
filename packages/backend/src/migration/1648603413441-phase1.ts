import { MigrationInterface, QueryRunner } from "typeorm";

export class phase11648603413441 implements MigrationInterface {
  name = "phase11648603413441";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "burned" ("id" SERIAL NOT NULL, "to" character varying NOT NULL, "batchID" integer, "amount" integer, "batchIDs" integer array NOT NULL DEFAULT '{}', "amounts" integer array NOT NULL DEFAULT '{}', "salt" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d8294cbebc54a228da6ebdd5208" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "canceled" ("id" SERIAL NOT NULL, "signature" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_648e43108118595f4726519e2bb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "erc1155_lootbox" ("id" SERIAL NOT NULL, "tokenId" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "external_url" character varying NOT NULL DEFAULT 'https://sipher.xyz', "image" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_dee78353b4954921c94dbde1ac5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "erc1155_sculpture" ("id" SERIAL NOT NULL, "tokenId" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "external_url" character varying NOT NULL DEFAULT 'https://sipher.xyz', "image" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c2b6f1a17f994502fa7a3e53a6e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "claimable_lootbox" ("id" SERIAL NOT NULL, "publicAddress" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "tokenId" integer NOT NULL, "expiredDate" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "propertyLootboxId" integer, CONSTRAINT "PK_77b7190f0846a5fef9a1b852225" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "erc1155_lootbox_attribute" ("id" SERIAL NOT NULL, "trait_type" character varying NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "erc1155Id" integer, CONSTRAINT "PK_a98f82cbee5f7c2e22bf954298f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "erc1155_sculpture_attribute" ("id" SERIAL NOT NULL, "trait_type" character varying NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "erc1155Id" integer, CONSTRAINT "PK_2d1e10f03c0e7d5bfbd442b52b2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "image_url" ("id" SERIAL NOT NULL, "color" character varying DEFAULT '', "default" character varying DEFAULT '', "front" character varying DEFAULT '', "back" character varying DEFAULT '', "left" character varying DEFAULT '', "right" character varying DEFAULT '', "top" character varying DEFAULT '', "bot" character varying DEFAULT '', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "airdropId" integer, "itemId" integer, CONSTRAINT "PK_8eefd361bbf7be8032aefa63a1e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" SERIAL NOT NULL, "merch_item" character varying NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "size" character varying array DEFAULT '{}', "color" character varying array DEFAULT '{}', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "lootbox" ("id" SERIAL NOT NULL, "publicAddress" character varying NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "tokenId" integer NOT NULL, "mintable" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "propertyLootboxId" integer, CONSTRAINT "PK_df79fe4dd2a98fb2756dbddd493" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "merchandise" ("id" SERIAL NOT NULL, "publicAddress" character varying NOT NULL, "tier" character varying NOT NULL, "merch_item" character varying NOT NULL, "quantity" integer NOT NULL, "quantity_shipped" integer NOT NULL, "isShipped" boolean NOT NULL DEFAULT false, "isShip" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "itemId" integer, CONSTRAINT "PK_00e2fdb70d486a410d6825d7579" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "pending_mint" ("id" SERIAL NOT NULL, "to" character varying NOT NULL, "batchID" integer, "amount" integer, "batchIDs" integer array NOT NULL DEFAULT '{}', "amounts" integer array NOT NULL DEFAULT '{}', "salt" character varying NOT NULL, "deadline" integer NOT NULL DEFAULT '0', "status" character varying NOT NULL DEFAULT 'Minting', "type" character varying NOT NULL, "signature" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4b6c503f13b4c517bdbc8318b72" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "sculpture_transaction" ("id" character varying NOT NULL, "event" character varying NOT NULL, "tokenId" character varying, "amount" integer NOT NULL, "ownerAddress" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8b85cc6db005ce33422f2c1a960" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "airdrop" ("id" SERIAL NOT NULL, "merkleRoot" character varying NOT NULL, "proof" character varying array NOT NULL, "leaf" character varying NOT NULL, "claimer" character varying NOT NULL, "addressContract" character varying NOT NULL, "totalAmount" character varying NOT NULL, "type" character varying NOT NULL, "startTime" character varying NOT NULL, "vestingInterval" character varying NOT NULL, "name" character varying, "description" character varying, "numberOfVestingPoint" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a6aea5b153cdf587fdbb38c5acc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "sipher_collection" ("id" character varying NOT NULL, "name" character varying NOT NULL, "collectionSlug" character varying NOT NULL, "chainId" integer NOT NULL, "collectionType" character varying NOT NULL DEFAULT 'ERC721', "category" character varying NOT NULL DEFAULT 'character', "floorPrice" numeric, "totalVolume" numeric, "marketCap" numeric, "totalSupply" integer, "totalSales" integer, "description" text NOT NULL DEFAULT '', "logoImage" character varying NOT NULL, "bannerImage" character varying NOT NULL, "siteUrl" character varying NOT NULL, "isVerified" boolean NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_053a6246ddcbd4f2e9c638d38d9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tracked_block" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "tracked" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0c07fcad6b158011496bc4ddd78" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "claimable_lootbox" ADD CONSTRAINT "FK_d5c9b1744420732aa301310debf" FOREIGN KEY ("propertyLootboxId") REFERENCES "erc1155_lootbox"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "erc1155_lootbox_attribute" ADD CONSTRAINT "FK_e7b5c3a55eb444eec3e24f784d8" FOREIGN KEY ("erc1155Id") REFERENCES "erc1155_lootbox"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "erc1155_sculpture_attribute" ADD CONSTRAINT "FK_b15c11e5c1b43a737bbf9ce1611" FOREIGN KEY ("erc1155Id") REFERENCES "erc1155_sculpture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "image_url" ADD CONSTRAINT "FK_2ce142b1c520dfa9d8b1d373d5b" FOREIGN KEY ("airdropId") REFERENCES "airdrop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "image_url" ADD CONSTRAINT "FK_ece6a6f49eb517f2f2333783f1b" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "lootbox" ADD CONSTRAINT "FK_a446715addb861bea9efcfb31ab" FOREIGN KEY ("propertyLootboxId") REFERENCES "erc1155_lootbox"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "merchandise" ADD CONSTRAINT "FK_d1ce42d0dba4d367a6f84124aa0" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "merchandise" DROP CONSTRAINT "FK_d1ce42d0dba4d367a6f84124aa0"`
    );
    await queryRunner.query(
      `ALTER TABLE "lootbox" DROP CONSTRAINT "FK_a446715addb861bea9efcfb31ab"`
    );
    await queryRunner.query(
      `ALTER TABLE "image_url" DROP CONSTRAINT "FK_ece6a6f49eb517f2f2333783f1b"`
    );
    await queryRunner.query(
      `ALTER TABLE "image_url" DROP CONSTRAINT "FK_2ce142b1c520dfa9d8b1d373d5b"`
    );
    await queryRunner.query(
      `ALTER TABLE "erc1155_sculpture_attribute" DROP CONSTRAINT "FK_b15c11e5c1b43a737bbf9ce1611"`
    );
    await queryRunner.query(
      `ALTER TABLE "erc1155_lootbox_attribute" DROP CONSTRAINT "FK_e7b5c3a55eb444eec3e24f784d8"`
    );
    await queryRunner.query(
      `ALTER TABLE "claimable_lootbox" DROP CONSTRAINT "FK_d5c9b1744420732aa301310debf"`
    );
    await queryRunner.query(`DROP TABLE "tracked_block"`);
    await queryRunner.query(`DROP TABLE "sipher_collection"`);
    await queryRunner.query(`DROP TABLE "airdrop"`);
    await queryRunner.query(`DROP TABLE "sculpture_transaction"`);
    await queryRunner.query(`DROP TABLE "pending_mint"`);
    await queryRunner.query(`DROP TABLE "merchandise"`);
    await queryRunner.query(`DROP TABLE "lootbox"`);
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "image_url"`);
    await queryRunner.query(`DROP TABLE "erc1155_sculpture_attribute"`);
    await queryRunner.query(`DROP TABLE "erc1155_lootbox_attribute"`);
    await queryRunner.query(`DROP TABLE "claimable_lootbox"`);
    await queryRunner.query(`DROP TABLE "erc1155_sculpture"`);
    await queryRunner.query(`DROP TABLE "erc1155_lootbox"`);
    await queryRunner.query(`DROP TABLE "canceled"`);
    await queryRunner.query(`DROP TABLE "burned"`);
  }
}
