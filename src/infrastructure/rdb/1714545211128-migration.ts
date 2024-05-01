import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1714545211128 implements MigrationInterface {
    name = 'Migration1714545211128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`nickName\` varchar(255) NOT NULL, \`avatarURL\` varchar(255) NOT NULL, \`gender\` enum ('Male', 'Female') NOT NULL, \`userId\` int NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_aebc3bfe11ea329ed91cd8c575\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ownerId\` int NOT NULL, \`sourceUserId\` int NOT NULL, \`content\` varchar(255) NOT NULL, \`postId\` int NULL, \`type\` enum ('FollowNotify', 'PostLikeNotify', 'PostCommentNotify') NOT NULL, \`read\` tinyint NOT NULL, \`image\` varchar(255) NOT NULL, \`owner_id\` int NULL, \`source_user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`follow\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`sourceUserId\` int NOT NULL, \`destinationUserId\` int NOT NULL, \`destination_user_id\` int NULL, \`source_user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`userName\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_da5934070b5f2726ebfd3122c8\` (\`userName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NOT NULL, \`postId\` int NOT NULL, \`user_id\` int NULL, \`post_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`content\` varchar(255) NOT NULL, \`tags\` json NOT NULL, \`images\` json NOT NULL, \`userId\` int NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`content\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`postId\` int NOT NULL, \`user_id\` int NULL, \`post_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_detail\` ADD CONSTRAINT \`FK_aebc3bfe11ea329ed91cd8c5759\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_3fd4edd1f8ca57ed9c674346fee\` FOREIGN KEY (\`owner_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_d979cff38596a4107aeeae4e5cb\` FOREIGN KEY (\`source_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_8d45657ab9d88b3d2a268f18468\` FOREIGN KEY (\`destination_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow\` ADD CONSTRAINT \`FK_06b3e6fd05a3cc66ae857d982b7\` FOREIGN KEY (\`source_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_4356ac2f9519c7404a2869f1691\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`like\` ADD CONSTRAINT \`FK_d41caa70371e578e2a4791a88ae\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_bbfe153fa60aa06483ed35ff4a7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_8aa21186314ce53c5b61a0e8c93\` FOREIGN KEY (\`post_id\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_8aa21186314ce53c5b61a0e8c93\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_bbfe153fa60aa06483ed35ff4a7\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_d41caa70371e578e2a4791a88ae\``);
        await queryRunner.query(`ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_4356ac2f9519c7404a2869f1691\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_06b3e6fd05a3cc66ae857d982b7\``);
        await queryRunner.query(`ALTER TABLE \`follow\` DROP FOREIGN KEY \`FK_8d45657ab9d88b3d2a268f18468\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_d979cff38596a4107aeeae4e5cb\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_3fd4edd1f8ca57ed9c674346fee\``);
        await queryRunner.query(`ALTER TABLE \`user_detail\` DROP FOREIGN KEY \`FK_aebc3bfe11ea329ed91cd8c5759\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`like\``);
        await queryRunner.query(`DROP INDEX \`IDX_da5934070b5f2726ebfd3122c8\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`follow\``);
        await queryRunner.query(`DROP TABLE \`notification\``);
        await queryRunner.query(`DROP INDEX \`REL_aebc3bfe11ea329ed91cd8c575\` ON \`user_detail\``);
        await queryRunner.query(`DROP TABLE \`user_detail\``);
    }

}
