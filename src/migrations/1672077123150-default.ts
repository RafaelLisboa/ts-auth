import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672077123150 implements MigrationInterface {
    name = 'default1672077123150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roles\` \`roles\` text array NOT NULL DEFAULT `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roles\` \`roles\` text NOT NULL`);
    }

}
