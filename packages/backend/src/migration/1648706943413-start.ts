import {MigrationInterface, QueryRunner} from "typeorm";

export class start1648706943413 implements MigrationInterface {
    name = 'start1648706943413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "erc1155_lootbox" DROP COLUMN "tokenId"`);
        await queryRunner.query(`ALTER TABLE "erc1155_lootbox" ADD "tokenId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "erc1155_sculpture" DROP COLUMN "tokenId"`);
        await queryRunner.query(`ALTER TABLE "erc1155_sculpture" ADD "tokenId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "claimable_lootbox" DROP COLUMN "expiredDate"`);
        await queryRunner.query(`ALTER TABLE "claimable_lootbox" ADD "expiredDate" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claimable_lootbox" DROP COLUMN "expiredDate"`);
        await queryRunner.query(`ALTER TABLE "claimable_lootbox" ADD "expiredDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "erc1155_sculpture" DROP COLUMN "tokenId"`);
        await queryRunner.query(`ALTER TABLE "erc1155_sculpture" ADD "tokenId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "erc1155_lootbox" DROP COLUMN "tokenId"`);
        await queryRunner.query(`ALTER TABLE "erc1155_lootbox" ADD "tokenId" character varying NOT NULL`);
    }

}
