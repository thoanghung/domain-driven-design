"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("@nestjs/class-transformer");
const comment_1 = require("@domain/entity/post/comment");
const post_1 = require("@infrastructure/rdb/entity/post");
const user_1 = require("@infrastructure/rdb/entity/user");
const comment_2 = require("@infrastructure/rdb/entity/comment");
const _1 = require(".");
const testData_1 = require("./testData");
describe('Comment Repository Testing', () => {
    const commentRepository = new _1.CommentRepository();
    let rdbConnection;
    let commentRDBRepository;
    let userRDBRepository;
    let postRDBRepository;
    let result;
    let commentRDBEntity;
    let commentId;
    beforeAll(async () => {
        rdbConnection = await (0, typeorm_1.createConnection)();
        userRDBRepository = (0, typeorm_1.getRepository)(user_1.default);
        postRDBRepository = (0, typeorm_1.getRepository)(post_1.default);
        commentRDBRepository = (0, typeorm_1.getRepository)(comment_2.default);
        await commentRDBRepository.delete({});
        await postRDBRepository.delete({});
        await userRDBRepository.delete({});
        await userRDBRepository.insert(testData_1.users);
        await postRDBRepository.insert(testData_1.posts);
        await commentRDBRepository.insert(testData_1.comments);
    });
    afterAll(async () => {
        await commentRDBRepository.delete({});
        await postRDBRepository.delete({});
        await userRDBRepository.delete({});
        await rdbConnection.close();
    });
    describe('getById testing', () => {
        describe('Normal case', () => {
            describe('Can get comment with exist id', () => {
                beforeAll(async () => {
                    commentId = 1;
                    result = await commentRepository.getById(null, commentId);
                });
                it('Comment data is as expected', () => {
                    expect(result).toEqual((0, class_transformer_1.plainToClass)(comment_1.CommentEntity, {
                        id: 1,
                        postId: 1,
                        userId: 1,
                        content: 'Comment-1',
                    }));
                });
            });
            describe('Can not get comment with non-exist id', () => {
                beforeAll(async () => {
                    commentId = 100;
                    result = await commentRepository.getById(null, commentId);
                });
                it('null is returned', () => {
                    expect(result).toBeNull();
                });
            });
        });
    });
    describe('save testing', () => {
        beforeAll(async () => {
            result = await commentRepository.save(null, (0, class_transformer_1.plainToClass)(comment_1.CommentEntity, {
                postId: 3,
                userId: 3,
                content: 'New comment',
            }));
            commentRDBEntity = await commentRDBRepository.findOne({
                where: { id: result.id },
            });
        });
        it('Result data is as expected', () => {
            expect(result).toEqual({
                id: expect.any(Number),
                postId: 3,
                userId: 3,
                content: 'New comment',
            });
        });
        it('Result data type is CommentEntity', () => {
            expect(result).toBeInstanceOf(comment_1.CommentEntity);
        });
        it('Comment data is saved into database', () => {
            expect(commentRDBEntity).toEqual({
                id: expect.any(Number),
                postId: 3,
                userId: 3,
                content: 'New comment',
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        });
    });
    describe('update testing', () => {
        beforeAll(async () => {
            commentId = 1;
            result = await commentRepository.update(null, (0, class_transformer_1.plainToClass)(comment_1.CommentEntity, {
                id: commentId,
                postId: 1,
                userId: 1,
                content: 'New comment',
            }));
            commentRDBEntity = await commentRDBRepository.findOne({
                where: { id: commentId },
            });
        });
        it('Result data is as expected', () => {
            expect(result).toEqual((0, class_transformer_1.plainToClass)(comment_1.CommentEntity, {
                id: commentId,
                postId: 1,
                userId: 1,
                content: 'New comment',
            }));
        });
        it('Comment data in database is updated', () => {
            expect(commentRDBEntity).toEqual({
                id: commentId,
                postId: 1,
                userId: 1,
                content: 'New comment',
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        });
    });
    describe('deleteById testing', () => {
        beforeAll(async () => {
            commentId = 1;
            await commentRepository.deleteById(null, commentId);
            commentRDBEntity = await commentRDBRepository.findOne(commentId);
        });
        it('Comment data is deleted from database', () => {
            expect(commentRDBEntity).toEqual(undefined);
        });
    });
});
//# sourceMappingURL=index.spec.js.map