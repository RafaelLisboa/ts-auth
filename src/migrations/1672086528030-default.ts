import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672086528030 implements MigrationInterface {
    name = 'default1672086528030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleIds\` \`password\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`roleIds\` text NULL`);
    }

}
