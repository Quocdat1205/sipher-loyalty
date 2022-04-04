import {MigrationInterface, QueryRunner} from "typeorm";

export class FixEnumCollection1649040340322 implements MigrationInterface {
    name = 'FixEnumCollection1649040340322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sipher_collection" DROP COLUMN "collectionType"`);
        await queryRunner.query(`CREATE TYPE "public"."sipher_collection_collectiontype_enum" AS ENUM('ERC721', 'ERC1155')`);
        await queryRunner.query(`ALTER TABLE "sipher_collection" ADD "collectionType" "public"."sipher_collection_collectiontype_enum" NOT NULL DEFAULT 'ERC721'`);
        await queryRunner.query(`ALTER TABLE "sipher_collection" DROP COLUMN "category"`);
        await queryRunner.query(`CREATE TYPE "public"."sipher_collection_category_enum" AS ENUM('character', 'sculpture', 'lootbox', 'spaceship')`);
        await queryRunner.query(`ALTER TABLE "sipher_collection" ADD "category" "public"."sipher_collection_category_enum" NOT NULL DEFAULT 'character'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sipher_collection" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."sipher_collection_category_enum"`);
        await queryRunner.query(`ALTER TABLE "sipher_collection" ADD "category" character varying NOT NULL DEFAULT 'character'`);
        await queryRunner.query(`ALTER TABLE "sipher_collection" DROP COLUMN "collectionType"`);
        await queryRunner.query(`DROP TYPE "public"."sipher_collection_collectiontype_enum"`);
        await queryRunner.query(`ALTER TABLE "sipher_collection" ADD "collectionType" character varying NOT NULL DEFAULT 'ERC721'`);
    }

}
