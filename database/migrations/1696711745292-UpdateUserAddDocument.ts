import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAddDocument1696711745292 implements MigrationInterface {
    name = 'UpdateUserAddDocument1696711745292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "document" character varying(36)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
