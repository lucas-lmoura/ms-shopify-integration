import { MigrationInterface, QueryRunner } from "typeorm";

export class Lineitemid1697221017924 implements MigrationInterface {
    name = 'Lineitemid1697221017924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "lineItemId" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "lineItemId"`);

    }

}
