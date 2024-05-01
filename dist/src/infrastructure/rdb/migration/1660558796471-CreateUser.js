"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1660558796471 = void 0;
class CreateUser1660558796471 {
    constructor() {
        this.name = 'CreateUser1660558796471';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `user_name` varchar(255) NOT NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`');
        await queryRunner.query('DROP TABLE `users`');
    }
}
exports.CreateUser1660558796471 = CreateUser1660558796471;
//# sourceMappingURL=1660558796471-CreateUser.js.map