import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrations1716848242810 implements MigrationInterface {
  name = 'Migrations1716848242810'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "consult_schema"."consults"
                             (
                                 "id"          SERIAL NOT NULL,
                                 "title"       character varying,
                                 "description" character varying,
                                 "date"        TIMESTAMP,
                                 "status"      character varying,
                                 "createdAt"   TIMESTAMP DEFAULT now(),
                                 "updatedAt"   TIMESTAMP DEFAULT now(),
                                 "deletedAt"   TIMESTAMP,
                                 CONSTRAINT "PK_f1dfb48f1617b7b774fd4da7a97" PRIMARY KEY ("id")
                             )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "consult_schema"."consults"`)
  }
}
