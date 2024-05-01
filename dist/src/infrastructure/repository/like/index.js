"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeRepository = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../base");
const like_1 = require("@infrastructure/rdb/entity/like");
const like_2 = require("@infrastructure/factory/like");
const likeFactory = new like_2.LikeFactory();
class LikeRepository extends base_1.default {
    async getByPostAndUserId(transaction, postId, userId) {
        const repository = transaction
            ? transaction.getRepository(like_1.default)
            : (0, typeorm_1.getRepository)(like_1.default);
        const query = this.getBaseQuery(repository);
        const like = await query
            .where('like.postId = :postId AND like.userId = :userId', {
            postId,
            userId,
        })
            .getOne();
        return likeFactory.createLikeEntity(like);
    }
    async getById(transaction, id) {
        const repository = transaction
            ? transaction.getRepository(like_1.default)
            : (0, typeorm_1.getRepository)(like_1.default);
        const query = this.getBaseQuery(repository);
        const like = await query.where('id = :id', { id }).getOne();
        return likeFactory.createLikeEntity(like);
    }
    async save(transaction, likeEntity) {
        const repository = transaction
            ? transaction.getRepository(like_1.default)
            : (0, typeorm_1.getRepository)(like_1.default);
        const createdLike = await repository.save({
            postId: likeEntity.postId,
            userId: likeEntity.userId,
        });
        return likeFactory.createLikeEntity(createdLike);
    }
    async deleteById(transaction, id) {
        const repository = transaction
            ? transaction.getRepository(like_1.default)
            : (0, typeorm_1.getRepository)(like_1.default);
        const likeEntity = await this.getById(transaction, id);
        await repository.remove(likeEntity);
    }
    getBaseQuery(repository) {
        const query = repository
            .createQueryBuilder('like')
            .select(['like.id', 'like.postId', 'like.userId']);
        return query;
    }
}
exports.LikeRepository = LikeRepository;
//# sourceMappingURL=index.js.map