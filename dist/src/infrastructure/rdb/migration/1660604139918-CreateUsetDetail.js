"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsetDetail1660604139918 = void 0;
class CreateUsetDetail1660604139918 {
    constructor() {
        this.name = 'CreateUsetDetail1660604139918';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE `user_details` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `nick_name` varchar(255) NOT NULL, `avatar_url` varchar(255) NOT NULL, `gender` varchar(255) NOT NULL, `user_id` int NOT NULL, UNIQUE INDEX `REL_ef1a1915f99bcf7a87049f7449` (`user_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `user_details` ADD CONSTRAINT `FK_ef1a1915f99bcf7a87049f74494` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `user_details` DROP FOREIGN KEY `FK_ef1a1915f99bcf7a87049f74494`');
        await queryRunner.query('DROP INDEX `REL_ef1a1915f99bcf7a87049f7449` ON `user_details`');
        await queryRunner.query('DROP TABLE `user_details`');
    }
}
exports.CreateUsetDetail1660604139918 = CreateUsetDetail1660604139918;
//# sourceMappingURL=1660604139918-CreateUsetDetail.js.map