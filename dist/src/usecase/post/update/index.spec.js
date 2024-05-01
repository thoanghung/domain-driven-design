"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("@nestjs/class-transformer");
const user_1 = require("@domain/entity/user");
const post_1 = require("@infrastructure/repository/post");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_2 = require("@infrastructure/repository/user");
const exception_1 = require("@usecase/exception");
const _1 = require(".");
const post_2 = require("@domain/entity/post");
const api_result_1 = require("@usecase/dto/api-result");
describe('UpdatePost Usecase Testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    const userId = 1;
    beforeAll(async () => {
        usecase = new _1.default(new user_2.UserRepository(), new post_1.PostRepository(), new transaction_1.default());
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
                    id: 1,
                    content: 'new content',
                    tags: ['new-tag-1', 'new-tag-2'],
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
                    id: 1,
                    content: 'New content',
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
            it('Error message is Post does not exist', () => {
                expect(error.message).toEqual('Post does not exist');
            });
            it('Error info detail code is POST_NOT_EXIST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.POST_NOT_EXIST);
            });
            it('Error info includes post id', () => {
                expect(error.info.postId).toEqual(input.id);
            });
        });
        describe('Unauthorized to update post', () => {
            beforeAll(async () => {
                input = {
                    id: 1,
                    tags: ['new-tag'],
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    content: 'content',
                    tags: ['tag'],
                    images: ['image-url'],
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
            it('Error message is "Unauthorized to update post"', () => {
                expect(error.message).toEqual('Unauthorized to update post');
            });
            it('Error info detailCode is UNAUTHORIZED_TO_UPDATE_POST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.UNAUTHORIZED_TO_UPDATE_POST);
            });
            it('Error info includes post id', () => {
                expect(error.info.postId).toEqual(input.id);
            });
            it('Error info includes user id', () => {
                expect(error.info.userId).toEqual(userId);
            });
        });
    });
    describe('Normal case', () => {
        describe('Update content only', () => {
            beforeAll(async () => {
                input = {
                    id: 1,
                    content: 'new content',
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    content: 'content',
                    tags: ['tag'],
                    userId: 1,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'update').mockResolvedValue(null);
                output = await usecase.execute(input, userId);
            });
            it('API result code is OK', () => {
                expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
            });
            it('Response post is as expected', () => {
                expect(output.post).toEqual({
                    id: 1,
                    content: 'new content',
                    tags: ['tag'],
                });
            });
            it('Reponse post type is UpdatedPostDto', () => {
                expect(output.post).toBeInstanceOf(_1.UpdatedPostDto);
            });
        });
        describe('Update tags only', () => {
            beforeAll(async () => {
                input = {
                    id: 1,
                    tags: ['new tag'],
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    content: 'content',
                    tags: ['tag'],
                    userId: 1,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'update').mockResolvedValue(null);
                output = await usecase.execute(input, userId);
            });
            it('API result code is OK', () => {
                expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
            });
            it('Response post is as expected', () => {
                expect(output.post).toEqual({
                    id: 1,
                    content: 'content',
                    tags: ['new tag'],
                });
            });
            it('Reponse post type is UpdatedPostDto', () => {
                expect(output.post).toBeInstanceOf(_1.UpdatedPostDto);
            });
        });
        describe('Update content, tags together', () => {
            beforeAll(async () => {
                input = {
                    id: 1,
                    content: 'new content',
                    tags: ['new tag'],
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    content: 'content',
                    tags: ['tag'],
                    userId: 1,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'update').mockResolvedValue(null);
                output = await usecase.execute(input, userId);
            });
            it('API result code is OK', () => {
                expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
            });
            it('Response post is as expected', () => {
                expect(output.post).toEqual({
                    id: 1,
                    content: 'new content',
                    tags: ['new tag'],
                });
            });
            it('Reponse post type is UpdatedPostDto', () => {
                expect(output.post).toBeInstanceOf(_1.UpdatedPostDto);
            });
        });
        describe('Do not update anything', () => {
            beforeAll(async () => {
                input = {
                    id: 1,
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    content: 'content',
                    tags: ['tag'],
                    userId: 1,
                }));
                jest.spyOn(post_1.PostRepository.prototype, 'update').mockResolvedValue(null);
                output = await usecase.execute(input, userId);
            });
            it('API result code is OK', () => {
                expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
            });
            it('Response post is as expected', () => {
                expect(output.post).toEqual({
                    id: 1,
                    content: 'content',
                    tags: ['tag'],
                });
            });
            it('Reponse post type is UpdatedPostDto', () => {
                expect(output.post).toBeInstanceOf(_1.UpdatedPostDto);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map