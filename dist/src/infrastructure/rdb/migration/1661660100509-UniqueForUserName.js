"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueForUserName1661660100509 = void 0;
class UniqueForUserName1661660100509 {
    constructor() {
        this.name = 'UniqueForUserName1661660100509';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE `users` CHANGE `user_name` `user_name` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `users` ADD UNIQUE INDEX `IDX_074a1f262efaca6aba16f7ed92` (`user_name`)');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `users` DROP INDEX `IDX_074a1f262efaca6aba16f7ed92`');
        await queryRunner.query('ALTER TABLE `users` CHANGE `user_name` `user_name` varchar(255) NOT NULL');
    }
}
exports.UniqueForUserName1661660100509 = UniqueForUserName1661660100509;
//# sourceMappingURL=1661660100509-UniqueForUserName.js.map