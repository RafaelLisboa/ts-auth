import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672458025229 implements MigrationInterface {
    name = 'default1672458025229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tokenHash\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tokens\``);
    }

}
