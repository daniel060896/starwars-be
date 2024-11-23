import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1732373099966 implements MigrationInterface {
  name = "Migrations1732373099966";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`participant\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`firstName\` varchar(32) NOT NULL, \`lastName\` varchar(32) NOT NULL, \`birthdate\` datetime NOT NULL, UNIQUE INDEX \`IDX_f79b360ddd7e02e579a3c8f49a\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_f79b360ddd7e02e579a3c8f49a\` ON \`participant\``,
    );
    await queryRunner.query(`DROP TABLE \`participant\``);
  }
}
