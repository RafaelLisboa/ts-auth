import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672077315563 implements MigrationInterface {
    name = 'default1672077315563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roles\` \`roles\` text NULL DEFAULT `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roles\` \`roles\` text NULL`);
    }

}
