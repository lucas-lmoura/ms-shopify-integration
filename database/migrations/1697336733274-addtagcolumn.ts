import { MigrationInterface, QueryRunner } from "typeorm";

export class Addtagcolumn1697336733274 implements MigrationInterface {
    name = 'Addtagcolumn1697336733274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery" ADD "tag" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "tag"`);
    }

}
