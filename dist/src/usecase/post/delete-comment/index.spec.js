"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("@nestjs/class-transformer");
const user_1 = require("@domain/entity/user");
const _1 = require(".");
const comment_1 = require("@infrastructure/repository/comment");
const post_1 = require("@infrastructure/repository/post");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_2 = require("@infrastructure/repository/user");
const exception_1 = require("@usecase/exception");
const post_2 = require("@domain/entity/post");
const comment_2 = require("@domain/entity/post/comment");
const api_result_1 = require("@usecase/dto/api-result");
describe('DeletePostComment Usecase Testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    const userId = 1;
    const postId = 1;
    const commentId = 1;
    beforeAll(async () => {
        usecase = new _1.default(new user_2.UserRepository(), new post_1.PostRepository(), new comment_1.CommentRepository(), new transaction_1.default());
        connection = await (0, typeorm_1.createConnection)();
    });
    afterAll(async () => {
        await connection.close();
    });
    describe('Abnormal case', () => {
        let error;
        describe('User does not exist', () => {
            beforeAll(async () => {
                input = {
                    postId,
                    commentId,
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue(null);
                try {
                    await usecase.execute(input, userId);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is NOT_FOUND', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.NOT_FOUND);
            });
            it('Error message is "User does not exist"', () => {
                expect(error.message).toEqual('User does not exist');
            });
            it('Error info detailCode is USER_NOT_EXIST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.USER_NOT_EXIST);
            });
            it('Error info includes userId', () => {
                expect(error.info.userId).toEqual(userId);
            });
        });
        describe('Post does not exist', () => {
            beforeAll(async () => {
                input = {
                    postId,
                    commentId,
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'getById').mockResolvedValue(null);
                try {
                    await usecase.execute(input, userId);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is NOT_FOUND', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.NOT_FOUND);
            });
            it('Error message is "Post does not exist"', () => {
                expect(error.message).toEqual('Post does not exist');
            });
            it('Error info detailCode is POST_NOT_EXIST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.POST_NOT_EXIST);
            });
            it('Error info includes postId', () => {
                expect(error.info.postId).toEqual(input.postId);
            });
        });
        describe('Comment does not exist', () => {
            beforeAll(async () => {
                input = {
                    postId,
                    commentId,
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    userId: 1,
                    content: 'content',
                    tags: ['tag'],
                    images: ['image-url'],
                }));
                jest
                    .spyOn(comment_1.CommentRepository.prototype, 'getById')
                    .mockResolvedValue(null);
                try {
                    await usecase.execute(input, userId);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is NOT_FOUND', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.NOT_FOUND);
            });
            it('Error message is "Comment does not exist"', () => {
                expect(error.message).toEqual('Comment does not exist');
            });
            it('Error info detailCode is COMMENT_NOT_EXIST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.COMMENT_NOT_EXIST);
            });
            it('Error info includes commentId', () => {
                expect(error.info.commentId).toEqual(commentId);
            });
        });
        describe('Unauthorized to delete comment', () => {
            beforeAll(async () => {
                input = {
                    postId,
                    commentId,
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    userId: 2,
                    content: 'content',
                    tags: ['tag'],
                    images: ['image-url'],
                }));
                jest.spyOn(comment_1.CommentRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(comment_2.CommentEntity, {
                    id: 1,
                    userId: 2,
                    postId: 2,
                }));
                try {
                    await usecase.execute(input, userId);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error message is "Unauthorized to delete comment"', () => {
                expect(error.message).toEqual('Unauthorized to delete comment');
            });
            it('Error info detailCode is UNAUTHORIZED_TO_DELETE_COMMENT', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.UNAUTHORIZED_TO_DELETE_COMMENT);
            });
        });
        describe('Is not comment of post', () => {
            beforeAll(async () => {
                input = {
                    postId,
                    commentId,
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    userId: 1,
                    content: 'content',
                    tags: ['tag'],
                    images: ['image-url'],
                }));
                jest.spyOn(comment_1.CommentRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(comment_2.CommentEntity, {
                    id: 1,
                    userId: 1,
                    postId: 2,
                }));
                try {
                    await usecase.execute(input, userId);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error message is "Is not comment of post"', () => {
                expect(error.message).toEqual('Is not comment of post');
            });
            it('Error info detailCode is IS_NOT_COMMENT_OF_POST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.IS_NOT_COMMENT_OF_POST);
            });
        });
    });
    describe('Normal case', () => {
        beforeAll(async () => {
            input = {
                postId,
                commentId,
            };
            jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                id: 1,
                email: 'test@mail.com',
                userName: 'userName',
                detail: null,
            }));
            jest.spyOn(post_1.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                id: 1,
                userId: 1,
                content: 'content',
                tags: ['tag'],
                images: ['image-url'],
            }));
            jest.spyOn(comment_1.CommentRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(comment_2.CommentEntity, {
                id: 1,
                userId: 1,
                postId: 1,
            }));
            jest
                .spyOn(comment_1.CommentRepository.prototype, 'deleteById')
                .mockResolvedValue(null);
            output = await usecase.execute(input, userId);
        });
        it('Response code is OK', () => {
            expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
        });
    });
});
//# sourceMappingURL=index.spec.js.map