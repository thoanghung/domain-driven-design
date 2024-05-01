"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_detail_1 = require("@domain/entity/user/user-detail");
const user_1 = require("@infrastructure/rdb/entity/user");
const user_detail_2 = require("@infrastructure/rdb/entity/user-detail");
const base_1 = require("@infrastructure/repository/base");
const user_2 = require("@infrastructure/factory/user");
const exception_1 = require("@infrastructure/exception");
const encrypt_1 = require("@utils/encrypt");
const userFactory = new user_2.UserFactory();
class UserRepository extends base_1.default {
    async getByEmail(transaction, email) {
        const repository = transaction
            ? transaction.getRepository(user_1.default)
            : (0, typeorm_1.getRepository)(user_1.default);
        const query = this.getBaseQuery(repository);
        const user = await query.where('user.email = :email', { email }).getOne();
        return userFactory.createUserEntity(user);
    }
    async getByIds(transaction, ids) {
        const repository = transaction
            ? transaction.getRepository(user_1.default)
            : (0, typeorm_1.getRepository)(user_1.default);
        const query = this.getBaseQuery(repository);
        const users = await query.where('user.id IN (:ids)', { ids }).getMany();
        return userFactory.createUserEntities(users);
    }
    async save(transaction, user) {
        const repository = transaction
            ? transaction.getRepository(user_1.default)
            : (0, typeorm_1.getRepository)(user_1.default);
        const salt = (0, encrypt_1.randomlyGenerateSalt)();
        const passwordHashedWithSalt = (0, encrypt_1.hashPassword)(user.password.toString(), salt);
        const createdUser = await repository.save({
            email: user.email.toString(),
            password: passwordHashedWithSalt,
            userName: user.userName,
            salt,
        });
        return userFactory.createUserEntity(createdUser);
    }
    async getById(transaction, id) {
        const repository = transaction
            ? transaction.getRepository(user_1.default)
            : (0, typeorm_1.getRepository)(user_1.default);
        const query = this.getBaseQuery(repository).where('user.id = :id', { id });
        const user = await query.getOne();
        return userFactory.createUserEntity(user);
    }
    async update(transaction, user) {
        const repository = transaction
            ? transaction.getRepository(user_1.default)
            : (0, typeorm_1.getRepository)(user_1.default);
        if (!user.id) {
            throw new exception_1.InfrastructureError({
                code: exception_1.InfrastructureErrorCode.BAD_REQUEST,
                message: 'Must specify user id',
                info: {
                    detailCode: exception_1.InfrastructureErrorDetailCode.MUST_SPECIFY_USER_ID,
                },
            });
        }
        const userRDBEntity = await repository.findOne({ where: { id: user.id } });
        if (!userRDBEntity) {
            throw new exception_1.InfrastructureError({
                code: exception_1.InfrastructureErrorCode.NOT_FOUND,
                message: 'User does not exist',
                info: {
                    detailCode: exception_1.InfrastructureErrorDetailCode.RDB_USER_NOT_EXIST,
                },
            });
        }
        userRDBEntity.email = user.email.toString();
        userRDBEntity.userName = user.userName;
        if (user.password) {
            userRDBEntity.password = (0, encrypt_1.hashPassword)(user.password.toString(), userRDBEntity.salt);
        }
        await repository.save(userRDBEntity);
        if (user.detail) {
            await this.updateUserDetail(transaction, user);
        }
        return this.getById(transaction, userRDBEntity.id);
    }
    async updateUserDetail(transaction, user) {
        const repository = transaction
            ? transaction.getRepository(user_detail_2.default)
            : (0, typeorm_1.getRepository)(user_detail_2.default);
        let userDetailRDBEntity;
        if (user.detail.id) {
            userDetailRDBEntity = await repository.findOne({
                where: { id: user.detail.id },
            });
        }
        else {
            userDetailRDBEntity = new user_detail_2.default();
            userDetailRDBEntity.userId = user.id;
        }
        userDetailRDBEntity.gender = user.detail.gender || user_detail_1.UserDetailGender.Male;
        userDetailRDBEntity.avatarURL = user.detail.avatarURL || '';
        userDetailRDBEntity.nickName = user.detail.nickName || '';
        await repository.save(userDetailRDBEntity);
    }
    getBaseQuery(repository) {
        const query = repository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.email',
            'user.userName',
            'userDetail.id',
            'userDetail.nickName',
            'userDetail.avatarURL',
            'userDetail.gender',
        ])
            .leftJoin('user.userDetail', 'userDetail');
        return query;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=index.js.map