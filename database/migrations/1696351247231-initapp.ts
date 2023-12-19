import { MigrationInterface, QueryRunner } from "typeorm";

export class Initapp1696351247231 implements MigrationInterface {
    name = 'Initapp1696351247231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shipping_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "currentRoute" character varying NOT NULL, "shippingId" uuid, CONSTRAINT "PK_aa81295021e91cfb99506ec004c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shippings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "originCountry" character varying NOT NULL, "trackingCode" character varying NOT NULL, "updateEvery" integer NOT NULL, "customerId" uuid, CONSTRAINT "UQ_5ba600949b4a4d213227ac39af8" UNIQUE ("trackingCode"), CONSTRAINT "PK_665fb613135782a598a2b47e5b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying, "last_name" character varying, "email" character varying NOT NULL, "createdDate" character varying, "phone" character varying, "shopifyId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "cnpj" character varying NOT NULL, "isActive" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL DEFAULT 'BRASIL', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "REL_c3fdf52cd6b4cbbeca8f5184fb" UNIQUE ("companyId"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "sysAdmin" boolean NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shipping_history" ADD CONSTRAINT "FK_0567b1f0b45f803dc861ec7cb26" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shippings" ADD CONSTRAINT "FK_2114c5dc8cf2ef716df82a6dfc2" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_a9d874b83a7879be8538bf08b09" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_c3fdf52cd6b4cbbeca8f5184fb3" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_c3fdf52cd6b4cbbeca8f5184fb3"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_a9d874b83a7879be8538bf08b09"`);
        await queryRunner.query(`ALTER TABLE "shippings" DROP CONSTRAINT "FK_2114c5dc8cf2ef716df82a6dfc2"`);
        await queryRunner.query(`ALTER TABLE "shipping_history" DROP CONSTRAINT "FK_0567b1f0b45f803dc861ec7cb26"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "shippings"`);
        await queryRunner.query(`DROP TABLE "shipping_history"`);
    }

}
