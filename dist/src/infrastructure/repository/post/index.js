"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("@infrastructure/repository/base");
const post_1 = require("@infrastructure/rdb/entity/post");
const post_2 = require("@infrastructure/factory/post");
const exception_1 = require("@infrastructure/exception");
const postFactory = new post_2.PostFactory();
class PostRepository extends base_1.default {
    async getById(transaction, id) {
        const repository = transaction
            ? transaction.getRepository(post_1.default)
            : (0, typeorm_1.getRepository)(post_1.default);
        const query = this.getBaseQuery(repository).where('post.id = :id', { id });
        const post = await query.getOne();
        return postFactory.createPostEntity(post);
    }
    async save(transaction, post) {
        const repository = transaction
            ? transaction.getRepository(post_1.default)
            : (0, typeorm_1.getRepository)(post_1.default);
        const createdPost = await repository.save({
            content: post.content,
            images: { list: post.images },
            tags: { list: post.tags },
            userId: post.userId,
        });
        return this.getById(transaction, createdPost.id);
    }
    async update(transaction, post) {
        const repository = transaction
            ? transaction.getRepository(post_1.default)
            : (0, typeorm_1.getRepository)(post_1.default);
        if (!post.id) {
            throw new exception_1.InfrastructureError({
                code: exception_1.InfrastructureErrorCode.BAD_REQUEST,
                message: 'Must specify post id',
                info: {
                    detailCode: exception_1.InfrastructureErrorDetailCode.MUST_SPECIFY_POST_ID,
                },
            });
        }
        const postRDBEntity = await repository.findOne({ where: { id: post.id } });
        if (!postRDBEntity) {
            throw new exception_1.InfrastructureError({
                code: exception_1.InfrastructureErrorCode.NOT_FOUND,
                message: 'Post does not exist',
                info: {
                    detailCode: exception_1.InfrastructureErrorDetailCode.RDB_POST_NOT_EXIST,
                },
            });
        }
        postRDBEntity.content = post.content;
        postRDBEntity.images = { list: post.images };
        postRDBEntity.tags = { list: post.tags };
        await repository.save(postRDBEntity);
        return this.getById(transaction, postRDBEntity.id);
    }
    async deleteById(transaction, id) {
        const repository = transaction
            ? transaction.getRepository(post_1.default)
            : (0, typeorm_1.getRepository)(post_1.default);
        const postEntity = await this.getById(transaction, id);
        await repository.remove(postEntity);
    }
    getBaseQuery(repository) {
        const query = repository
            .createQueryBuilder('post')
            .select([
            'post.id',
            'post.images',
            'post.tags',
            'post.content',
            'post.createdAt',
            'like.id',
            'like.userId',
            'like.postId',
            'comment.id',
            'comment.content',
            'comment.postId',
            'comment.userId',
            'comment.createdAt',
            'user.id',
        ])
            .innerJoin('post.user', 'user')
            .leftJoin('post.likes', 'like')
            .leftJoin('post.comments', 'comment');
        return query;
    }
}
exports.PostRepository = PostRepository;
//# sourceMappingURL=index.js.map