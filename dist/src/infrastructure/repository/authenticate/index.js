"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateRepository = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("@infrastructure/rdb/entity/user");
const encrypt_1 = require("@utils/encrypt");
class AuthenticateRepository {
    getJWT(userId, email) {
        return (0, encrypt_1.generateJWT)(userId, email);
    }
    async isEmailBeingUsed(email) {
        const repository = (0, typeorm_1.getRepository)(user_1.default);
        const query = this.getBaseQuery(repository);
        const user = await query.where('user.email = :email', { email }).getOne();
        return user !== undefined;
    }
    async validatePassword(email, password) {
        const repository = (0, typeorm_1.getRepository)(user_1.default);
        const query = this.getBaseQuery(repository);
        const user = await query
            .where('user.email = :email', { email })
            .addSelect('user.password')
            .addSelect('user.salt')
            .getOne();
        const hashedPassword = (0, encrypt_1.hashPassword)(password, user.salt);
        return user.password === hashedPassword;
    }
    getBaseQuery(repository) {
        const query = repository
            .createQueryBuilder('user')
            .select(['user.id', 'user.email']);
        return query;
    }
}
exports.AuthenticateRepository = AuthenticateRepository;
//# sourceMappingURL=index.js.map