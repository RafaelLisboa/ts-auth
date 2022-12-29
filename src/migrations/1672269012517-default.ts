import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672269012517 implements MigrationInterface {
    name = 'default1672269012517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_types\` CHANGE \`name\` \`name\` varchar(255) NOT NULL DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_types\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
    }

}
