"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const typeorm_1 = require("typeorm");
const comment_1 = require("@infrastructure/rdb/entity/comment");
const comment_2 = require("@infrastructure/factory/comment");
const exception_1 = require("@infrastructure/exception");
const base_1 = require("../base");
const commentFactory = new comment_2.CommentFactory();
class CommentRepository extends base_1.default {
    async getById(transaction, id) {
        const repository = transaction
            ? transaction.getRepository(comment_1.default)
            : (0, typeorm_1.getRepository)(comment_1.default);
        const query = this.getBaseQuery(repository).where('comment.id = :id', {
            id,
        });
        const comment = await query.getOne();
        return commentFactory.createCommentEntity(comment);
    }
    async save(transaction, comment) {
        const repository = transaction
            ? transaction.getRepository(comment_1.default)
            : (0, typeorm_1.getRepository)(comment_1.default);
        const createdComment = await repository.save({
            content: comment.content,
            userId: comment.userId,
            postId: comment.postId,
        });
        return commentFactory.createCommentEntity(createdComment);
    }
    async update(transaction, comment) {
        const repository = transaction
            ? transaction.getRepository(comment_1.default)
            : (0, typeorm_1.getRepository)(comment_1.default);
        if (!comment.id) {
            throw new exception_1.InfrastructureError({
                code: exception_1.InfrastructureErrorCode.BAD_REQUEST,
                message: 'Must specify comment id',
                info: {
                    detailCode: exception_1.InfrastructureErrorDetailCode.MUST_SPECIFY_COMMENT_ID,
                },
            });
        }
        const commentRDBEntity = await repository.findOne({ id: comment.id });
        if (!commentRDBEntity) {
            throw new exception_1.InfrastructureError({
                code: exception_1.InfrastructureErrorCode.NOT_FOUND,
                message: 'Comment does not exist',
                info: {
                    detailCode: exception_1.InfrastructureErrorDetailCode.RDB_COMMENT_NOT_EXIST,
                },
            });
        }
        commentRDBEntity.content = comment.content;
        await repository.save(commentRDBEntity);
        return this.getById(transaction, commentRDBEntity.id);
    }
    async deleteById(transaction, id) {
        const repository = transaction
            ? transaction.getRepository(comment_1.default)
            : (0, typeorm_1.getRepository)(comment_1.default);
        const commentEntity = await this.getById(transaction, id);
        await repository.remove(commentEntity);
    }
    getBaseQuery(repository) {
        const query = repository
            .createQueryBuilder('comment')
            .select([
            'comment.id',
            'comment.userId',
            'comment.postId',
            'comment.content',
        ]);
        return query;
    }
}
exports.CommentRepository = CommentRepository;
//# sourceMappingURL=index.js.map