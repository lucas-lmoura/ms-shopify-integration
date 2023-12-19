import { MigrationInterface, QueryRunner } from "typeorm";

export class Cicle1697219922766 implements MigrationInterface {
    name = 'Cicle1697219922766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery" ADD "cicle" integer NOT NULL DEFAULT '30'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shippings" ALTER COLUMN "creationDate" SET DEFAULT '2023-10-13 17:53:09.298'`);
        await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "cicle"`);
    }

}
