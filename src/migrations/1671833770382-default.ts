import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671833770382 implements MigrationInterface {
    name = 'default1671833770382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`roleTypeId\` int NOT NULL AUTO_INCREMENT, \`roleTypeName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`, \`roleTypeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, \`rolesId\` varchar(255) NOT NULL, \`rolesCreated_at\` datetime NOT NULL, \`rolesRoleTypeId\` int NOT NULL AUTO_INCREMENT, \`rolesRoleTypeName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`, \`rolesId\`, \`rolesRoleTypeId\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles_types\``);
    }

}
