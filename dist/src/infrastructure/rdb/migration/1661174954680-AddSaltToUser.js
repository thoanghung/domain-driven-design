"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSaltToUser1661174954680 = void 0;
class AddSaltToUser1661174954680 {
    constructor() {
        this.name = 'AddSaltToUser1661174954680';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE `users` ADD `salt` varchar(255) NOT NULL');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `users` DROP COLUMN `salt`');
    }
}
exports.AddSaltToUser1661174954680 = AddSaltToUser1661174954680;
//# sourceMappingURL=1661174954680-AddSaltToUser.js.map