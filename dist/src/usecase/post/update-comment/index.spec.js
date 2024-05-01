"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("@nestjs/class-transformer");
const typeorm_1 = require("typeorm");
const post_1 = require("@domain/entity/post");
const comment_1 = require("@domain/entity/post/comment");
const user_1 = require("@domain/entity/user");
const exception_1 = require("@usecase/exception");
const _1 = require(".");
const api_result_1 = require("@usecase/dto/api-result");
const comment_2 = require("@infrastructure/repository/comment");
const post_2 = require("@infrastructure/repository/post");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_2 = require("@infrastructure/repository/user");
describe('UpdatePostComment Usecase Testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    const userId = 1;
    const postId = 1;
    const commentId = 1;
    beforeAll(async () => {
        usecase = new _1.default(new user_2.UserRepository(), new post_2.PostRepository(), new comment_2.CommentRepository(), new transaction_1.default());
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
                    content: 'new content',
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
            it('Error info detail code is USER_NOT_EXIST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.USER_NOT_EXIST);
            });
            it('Error info includes userId', () => {
                expect(error.info.userId).toEqual(userId);
            });
        });
        describe('Post does not exist', () => {
            beforeAll(async () => {
                input = {
                    commentId,
                    postId,
                    content: 'New content',
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_2.PostRepository.prototype, 'getById').mockResolvedValue(null);
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
            it('Error message is Post does not exist', () => {
                expect(error.message).toEqual('Post does not exist');
            });
            it('Error info detail code is POST_NOT_EXIST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.POST_NOT_EXIST);
            });
            it('Error info includes post id', () => {
                expect(error.info.postId).toEqual(postId);
            });
        });
        describe('Comment does not exist', () => {
            beforeAll(async () => {
                input = {
                    postId,
                    commentId,
                    content: 'New content',
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_2.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_1.PostEntity, {
                    id: 1,
                    content: 'content',
                    tags: ['tag'],
                    images: ['image-url'],
                    userId: 2,
                }));
                jest
                    .spyOn(comment_2.CommentRepository.prototype, 'getById')
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
            it('Error info includes comment id', () => {
                expect(error.info.commentId).toEqual(commentId);
            });
        });
        describe('Unauthorized to update comment', () => {
            beforeAll(async () => {
                input = {
                    postId,
                    commentId,
                    content: 'New content',
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_2.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_1.PostEntity, {
                    id: 1,
                    content: 'content',
                    tags: ['tag'],
                    images: ['image-url'],
                    userId: 2,
                }));
                jest.spyOn(comment_2.CommentRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(comment_1.CommentEntity, {
                    id: 1,
                    postId: 1,
                    userId: 2,
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
            it('Error message is "Unauthorized to update comment"', () => {
                expect(error.message).toEqual('Unauthorized to update comment');
            });
            it('Error info detailCode is UNAUTHORIZED_TO_UPDATE_COMMENT', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.UNAUTHORIZED_TO_UPDATE_COMMENT);
            });
        });
        describe('Comment content can not be empty', () => {
            beforeAll(async () => {
                input = {
                    postId,
                    commentId,
                    content: '',
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_2.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_1.PostEntity, {
                    id: 1,
                    content: 'content',
                    tags: ['tag'],
                    images: ['image-url'],
                    userId: 2,
                }));
                jest.spyOn(comment_2.CommentRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(comment_1.CommentEntity, {
                    id: 1,
                    postId: 1,
                    userId: 1,
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
            it('Error message is "Comment content can not be empty"', () => {
                expect(error.message).toEqual('Comment content can not be empty');
            });
            it('Error info detailCode is COMMENT_CONTENT_CAN_NOT_EMPTY', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.COMMENT_CONTENT_CAN_NOT_EMPTY);
            });
        });
    });
    describe('Normal case', () => {
        beforeAll(async () => {
            input = {
                postId,
                commentId,
                content: 'New content',
            };
            jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                id: 1,
                email: 'test@mail.com',
                userName: 'userName',
                detail: null,
            }));
            jest.spyOn(post_2.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_1.PostEntity, {
                id: 1,
                content: 'content',
                tags: ['tag'],
                images: ['image-url'],
                userId: 2,
            }));
            jest.spyOn(comment_2.CommentRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(comment_1.CommentEntity, {
                id: 1,
                postId: 1,
                userId: 1,
            }));
            jest.spyOn(comment_2.CommentRepository.prototype, 'update').mockResolvedValue(null);
            output = await usecase.execute(input, userId);
        });
        it('Response code is OK', () => {
            expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
        });
    });
});
//# sourceMappingURL=index.spec.js.map