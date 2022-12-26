import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672066837345 implements MigrationInterface {
    name = 'default1672066837345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`documentNumber\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`documentNumber\``);
    }

}
