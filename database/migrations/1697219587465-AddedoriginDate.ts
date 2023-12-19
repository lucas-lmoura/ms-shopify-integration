import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedoriginDate1697219587465 implements MigrationInterface {
    name = 'AddedoriginDate1697219587465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shippings" ADD "creationDate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shippings" DROP COLUMN "creationDate"`);
    }

}
