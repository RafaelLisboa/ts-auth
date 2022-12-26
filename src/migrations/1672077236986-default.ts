import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672077236986 implements MigrationInterface {
    name = 'default1672077236986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roles\` \`roles\` text array NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`roles\` \`roles\` text NOT NULL`);
    }

}
