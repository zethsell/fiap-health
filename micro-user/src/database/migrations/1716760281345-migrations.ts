import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1716760281345 implements MigrationInterface {
  name = 'Migrations1716760281345';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user_schema"."users-auth"
                             (
                                 "id"             SERIAL NOT NULL,
                                 "code"           character varying,
                                 "codeValidateAt" TIMESTAMP,
                                 "codeExpiresAt"  TIMESTAMP,
                                 "userId"         integer,
                                 CONSTRAINT "REL_8ea85c45ce28f4a1bf19557a0e" UNIQUE ("userId"),
                                 CONSTRAINT "PK_da081eeda7d183c9fa66e49d853" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "user_schema"."users"
                             (
                                 "id"           SERIAL            NOT NULL,
                                 "name"         character varying,
                                 "surname"      character varying,
                                 "email"        character varying NOT NULL,
                                 "accessAt"     TIMESTAMP,
                                 "lastAccessAt" TIMESTAMP,
                                 "createdAt"    TIMESTAMP DEFAULT now(),
                                 "updatedAt"    TIMESTAMP DEFAULT now(),
                                 "deletedAt"    TIMESTAMP,
                                 CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                                 CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "user_schema"."users-auth"
        ADD CONSTRAINT "FK_8ea85c45ce28f4a1bf19557a0e2" FOREIGN KEY ("userId") REFERENCES "user_schema"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_schema"."users-auth"
        DROP CONSTRAINT "FK_8ea85c45ce28f4a1bf19557a0e2"`);
    await queryRunner.query(`DROP TABLE "user_schema"."users"`);
    await queryRunner.query(`DROP TABLE "user_schema"."users-auth"`);
  }
}
