"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("@nestjs/class-transformer");
const typeorm_1 = require("typeorm");
const user_1 = require("@domain/entity/user");
const post_1 = require("@domain/entity/post");
const like_1 = require("@domain/entity/post/like");
const exception_1 = require("@usecase/exception");
const _1 = require(".");
const like_2 = require("@infrastructure/repository/like");
const post_2 = require("@infrastructure/repository/post");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_2 = require("@infrastructure/repository/user");
const api_result_1 = require("@usecase/dto/api-result");
describe('UnlikePost Usecase Testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    const userId = 1;
    beforeAll(async () => {
        usecase = new _1.default(new user_2.UserRepository(), new post_2.PostRepository(), new like_2.LikeRepository(), new transaction_1.default());
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
                    postId: 1,
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
                    postId: 1,
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
        describe('Have not liked post', () => {
            beforeAll(async () => {
                input = {
                    postId: 1,
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
                jest
                    .spyOn(like_2.LikeRepository.prototype, 'getByPostAndUserId')
                    .mockResolvedValue(null);
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
            it('Error message is "You have not liked this post"', () => {
                expect(error.message).toEqual('You have not liked this post');
            });
            it('Error info detailCode is HAVE_NOT_LIKED_POST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.HAVE_NOT_LIKED_POST);
            });
        });
    });
    describe('Normal case', () => {
        beforeAll(async () => {
            input = {
                postId: 1,
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
            jest
                .spyOn(like_2.LikeRepository.prototype, 'getByPostAndUserId')
                .mockResolvedValue((0, class_transformer_1.plainToClass)(like_1.LikeEntity, {
                id: 1,
                postId: 1,
                userId: 1,
            }));
            jest
                .spyOn(like_2.LikeRepository.prototype, 'deleteById')
                .mockResolvedValue(null);
            output = await usecase.execute(input, userId);
        });
        it('Response code is OK', () => {
            expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
        });
    });
});
//# sourceMappingURL=index.spec.js.map