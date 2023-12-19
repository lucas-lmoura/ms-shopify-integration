import { MigrationInterface, QueryRunner } from "typeorm";

export class Addsendvalidation1696772873872 implements MigrationInterface {
    name = 'Addsendvalidation1696772873872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_history" ADD "notified" boolean NOT NULL DEFAULT false`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_history" DROP COLUMN "notified"`);
    }

}
