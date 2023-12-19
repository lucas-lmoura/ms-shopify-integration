import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedoriginProvince1697216534119 implements MigrationInterface {
    name = 'AddedoriginProvince1697216534119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery" ADD "originProvince" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "originProvince"`);
    }

}
