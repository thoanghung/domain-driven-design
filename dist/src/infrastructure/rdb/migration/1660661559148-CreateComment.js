"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComment1660661559148 = void 0;
class CreateComment1660661559148 {
    constructor() {
        this.name = 'CreateComment1660661559148';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE `comment_entities` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `content` varchar(255) NOT NULL, `user_id` int NOT NULL, `post_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `comment_entities` ADD CONSTRAINT `FK_3635868cd061cff4bf1ae6fb12f` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `comment_entities` ADD CONSTRAINT `FK_63c7812e524428b78bc6456097f` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `comment_entities` DROP FOREIGN KEY `FK_63c7812e524428b78bc6456097f`');
        await queryRunner.query('ALTER TABLE `comment_entities` DROP FOREIGN KEY `FK_3635868cd061cff4bf1ae6fb12f`');
        await queryRunner.query('DROP TABLE `comment_entities`');
    }
}
exports.CreateComment1660661559148 = CreateComment1660661559148;
//# sourceMappingURL=1660661559148-CreateComment.js.map