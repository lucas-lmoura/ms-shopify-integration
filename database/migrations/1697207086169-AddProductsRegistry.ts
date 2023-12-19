import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductsRegistry1697207086169 implements MigrationInterface {
    name = 'AddProductsRegistry1697207086169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" character varying NOT NULL, "quantity" character varying NOT NULL, "trackingCode" character varying NOT NULL, "status" json NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
