"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLike1660661258218 = void 0;
class CreateLike1660661258218 {
    constructor() {
        this.name = 'CreateLike1660661258218';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE `like_entities` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `user_id` int NOT NULL, `post_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `like_entities` ADD CONSTRAINT `FK_2bc1b7a1e239d520ddd40753ccb` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `like_entities` ADD CONSTRAINT `FK_4763d225b5f4077b998a58a8ae4` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `like_entities` DROP FOREIGN KEY `FK_4763d225b5f4077b998a58a8ae4`');
        await queryRunner.query('ALTER TABLE `like_entities` DROP FOREIGN KEY `FK_2bc1b7a1e239d520ddd40753ccb`');
        await queryRunner.query('DROP TABLE `like_entities`');
    }
}
exports.CreateLike1660661258218 = CreateLike1660661258218;
//# sourceMappingURL=1660661258218-CreateLike.js.map