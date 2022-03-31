import {MigrationInterface, QueryRunner} from "typeorm";

export class start11648715571858 implements MigrationInterface {
    name = 'start11648715571858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchandise" ALTER COLUMN "quantityShipped" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "merchandise" ALTER COLUMN "quantityShipped" DROP DEFAULT`);
    }

}
