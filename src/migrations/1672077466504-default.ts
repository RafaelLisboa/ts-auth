import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672077466504 implements MigrationInterface {
    name = 'default1672077466504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleIds\` \`roleIds\` text NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roleIds\` \`roleIds\` text NULL`);
    }

}
