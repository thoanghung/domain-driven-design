"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePost1660660924508 = void 0;
class CreatePost1660660924508 {
    constructor() {
        this.name = 'CreatePost1660660924508';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE `posts` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `content` varchar(255) NOT NULL, `tags` varchar(255) NOT NULL, `images` varchar(255) NOT NULL, `user_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `posts` ADD CONSTRAINT `FK_c4f9a7bd77b489e711277ee5986` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `posts` DROP FOREIGN KEY `FK_c4f9a7bd77b489e711277ee5986`');
        await queryRunner.query('DROP TABLE `posts`');
    }
}
exports.CreatePost1660660924508 = CreatePost1660660924508;
//# sourceMappingURL=1660660924508-CreatePost.js.map