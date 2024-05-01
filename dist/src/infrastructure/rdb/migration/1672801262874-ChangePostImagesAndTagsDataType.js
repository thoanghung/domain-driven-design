"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePostImagesAndTagsDataType1672801262874 = void 0;
class ChangePostImagesAndTagsDataType1672801262874 {
    constructor() {
        this.name = 'ChangePostImagesAndTagsDataType1672801262874';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE `posts` DROP COLUMN `tags`');
        await queryRunner.query('ALTER TABLE `posts` ADD `tags` json NOT NULL');
        await queryRunner.query('ALTER TABLE `posts` DROP COLUMN `images`');
        await queryRunner.query('ALTER TABLE `posts` ADD `images` json NOT NULL');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `posts` DROP COLUMN `images`');
        await queryRunner.query('ALTER TABLE `posts` ADD `images` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `posts` DROP COLUMN `tags`');
        await queryRunner.query('ALTER TABLE `posts` ADD `tags` varchar(255) NOT NULL');
    }
}
exports.ChangePostImagesAndTagsDataType1672801262874 = ChangePostImagesAndTagsDataType1672801262874;
//# sourceMappingURL=1672801262874-ChangePostImagesAndTagsDataType.js.map