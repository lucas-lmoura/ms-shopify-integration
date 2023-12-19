import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCustomRouteEntity1697206011894 implements MigrationInterface {
    name = 'AddCustomRouteEntity1697206011894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "delivery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "interval" integer NOT NULL, "defaults" json NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "delivery"`);
    }

}
