"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowRepository = void 0;
const typeorm_1 = require("typeorm");
const follow_1 = require("@infrastructure/rdb/entity/follow");
const follow_2 = require("@infrastructure/factory/follow");
const base_1 = require("../base");
const followFactory = new follow_2.FollowFactory();
class FollowRepository extends base_1.default {
    async getById(transaction, id) {
        const repository = transaction
            ? transaction.getRepository(follow_1.default)
            : (0, typeorm_1.getRepository)(follow_1.default);
        const query = this.getBaseQuery(repository);
        const follow = await query.where('follow.id = :id', { id }).getOne();
        if (!follow)
            return null;
        return followFactory.createFollowEntity(follow);
    }
    async getByUserIds(transaction, sourceUserId, destinationUserId) {
        const repository = transaction
            ? transaction.getRepository(follow_1.default)
            : (0, typeorm_1.getRepository)(follow_1.default);
        const query = this.getBaseQuery(repository)
            .where('follow.sourceUserId = :sourceUserId', { sourceUserId })
            .andWhere('follow.destinationUserId = :destinationUserId', {
            destinationUserId,
        });
        const follow = await query.getOne();
        if (!follow)
            return null;
        return followFactory.createFollowEntity(follow);
    }
    async save(transaction, follow) {
        const repository = transaction
            ? transaction.getRepository(follow_1.default)
            : (0, typeorm_1.getRepository)(follow_1.default);
        const createdFollow = repository.save({
            sourceUserId: follow.sourceUserId,
            destinationUserId: follow.destinationUserId,
        });
        return followFactory.createFollowEntity(createdFollow);
    }
    async deleteById(transaction, id) {
        const repository = transaction
            ? transaction.getRepository(follow_1.default)
            : (0, typeorm_1.getRepository)(follow_1.default);
        const followEntity = await this.getById(transaction, id);
        await repository.remove(followEntity);
    }
    getBaseQuery(repository) {
        const query = repository
            .createQueryBuilder('follow')
            .select(['follow.id', 'follow.sourceUserId', 'follow.destinationUserId']);
        return query;
    }
}
exports.FollowRepository = FollowRepository;
//# sourceMappingURL=index.js.map