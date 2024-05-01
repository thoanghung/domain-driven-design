"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeGenderOfUserDetailToEnum1660690903877 = void 0;
class ChangeGenderOfUserDetailToEnum1660690903877 {
    constructor() {
        this.name = 'ChangeGenderOfUserDetailToEnum1660690903877';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE `user_details` DROP COLUMN `gender`');
        await queryRunner.query("ALTER TABLE `user_details` ADD `gender` enum ('Male', 'Female') NOT NULL");
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `user_details` DROP COLUMN `gender`');
        await queryRunner.query('ALTER TABLE `user_details` ADD `gender` varchar(255) NOT NULL');
    }
}
exports.ChangeGenderOfUserDetailToEnum1660690903877 = ChangeGenderOfUserDetailToEnum1660690903877;
//# sourceMappingURL=1660690903877-ChangeGenderOfUserDetailToEnum.js.map