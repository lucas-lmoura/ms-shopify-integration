import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderId1696778295975 implements MigrationInterface {
    name = 'AddOrderId1696778295975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shippings" ADD "orderId" character varying NOT NULL`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shippings" DROP COLUMN "orderId"`);
    }

}
