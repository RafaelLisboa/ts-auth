import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672074746903 implements MigrationInterface {
    name = 'default1672074746903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`rolesId\` \`rolesId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_30cd0bbcd1dcae7673af7888eb8\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_30cd0bbcd1dcae7673af7888eb8\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD PRIMARY KEY (\`id\`, \`rolesId\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`rolesId\` \`rolesId\` varchar(255) NOT NULL`);
    }

}
