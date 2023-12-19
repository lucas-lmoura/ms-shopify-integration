import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderedProductsTableRelation1697207852674 implements MigrationInterface {
    name = 'AddOrderedProductsTableRelation1697207852674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "shippingId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_17c3df74183a2df4485b1090424" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_17c3df74183a2df4485b1090424"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "shippingId"`);
    }

}
