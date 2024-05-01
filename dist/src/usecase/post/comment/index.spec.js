"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("@nestjs/class-transformer");
const user_1 = require("@domain/entity/user");
const post_1 = require("@domain/entity/post");
const _1 = require(".");
const exception_1 = require("@usecase/exception");
const api_result_1 = require("@usecase/dto/api-result");
const comment_1 = require("@infrastructure/repository/comment");
const post_2 = require("@infrastructure/repository/post");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_2 = require("@infrastructure/repository/user");
describe('CommentPost Usecase Testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    const userId = 1;
    const postId = 1;
    beforeAll(async () => {
        usecase = new _1.default(new user_2.UserRepository(), new post_2.PostRepository(), new comment_1.CommentRepository(), new transaction_1.default());
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
                    content: 'comment',
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue(null);
                try {
                    await usecase.execute(input, { postId, userId });
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
        });
        describe('Post does not exist', () => {
            beforeAll(async () => {
                input = {
                    content: 'comment',
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_2.PostRepository.prototype, 'getById').mockResolvedValue(null);
                try {
                    await usecase.execute(input, { postId, userId });
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
        });
        describe('Comment content is empty', () => {
            beforeAll(async () => {
                input = {
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
                    userId: 1,
                    content: 'content',
                    tags: ['tag'],
                    images: ['image-url'],
                }));
                try {
                    await usecase.execute(input, { postId, userId });
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error message is "Content can not be empty"', () => {
                expect(error.message).toEqual('Content can not be empty');
            });
            it('Error info detailCode is COMMENT_CONTENT_CAN_NOT_EMPTY', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.COMMENT_CONTENT_CAN_NOT_EMPTY);
            });
        });
    });
    describe('Normal case', () => {
        beforeAll(async () => {
            input = {
                content: 'new comment content',
            };
            jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                id: 1,
                email: 'test@mail.com',
                userName: 'userName',
                detail: null,
            }));
            jest.spyOn(post_2.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_1.PostEntity, {
                id: 1,
                userId: 1,
                content: 'content',
                tags: ['tag'],
                images: ['image-url'],
            }));
            jest.spyOn(comment_1.CommentRepository.prototype, 'save').mockResolvedValue(null);
            output = await usecase.execute(input, { postId, userId });
        });
        it('Response code is OK', () => {
            expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
        });
    });
});
//# sourceMappingURL=index.spec.js.map