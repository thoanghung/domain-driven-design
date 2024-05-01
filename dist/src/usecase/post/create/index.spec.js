"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("@nestjs/class-transformer");
const image_1 = require("@infrastructure/repository/image");
const post_1 = require("@infrastructure/repository/post");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_1 = require("@infrastructure/repository/user");
const _1 = require(".");
const exception_1 = require("@usecase/exception");
const api_result_1 = require("@usecase/dto/api-result");
const user_2 = require("@domain/entity/user");
const post_2 = require("@domain/entity/post");
describe('CreatePost Usecase Testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    const userId = 1;
    beforeAll(async () => {
        usecase = new _1.default(new user_1.UserRepository(), new image_1.default(), new post_1.PostRepository(), new transaction_1.default());
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
                    content: 'content',
                    images: [
                        {
                            fieldname: 'images',
                            originalname: 'test1.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 1'),
                            size: 67418,
                        },
                    ],
                };
                jest.spyOn(user_1.UserRepository.prototype, 'getById').mockResolvedValue(null);
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
            it('Error info includes user id', () => {
                expect(error.info.userId).toEqual(userId);
            });
        });
        describe('Do not submit any pictures', () => {
            beforeAll(async () => {
                input = {
                    content: 'Post content',
                    tags: ['tag-1', 'tag-2'],
                    images: null,
                };
                jest.spyOn(user_1.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_2.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
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
            it('Error message is "Post must have at least one image"', () => {
                expect(error.message).toEqual('Post must have at least one image');
            });
            it('Error info detail code is POST_MUST_HAVE_IMAGE', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.POST_MUST_HAVE_IMAGE);
            });
        });
        describe('Submit no pictures', () => {
            beforeAll(async () => {
                input = {
                    content: 'Post content',
                    tags: ['tag-1', 'tag-2'],
                    images: [],
                };
                jest.spyOn(user_1.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_2.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
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
            it('Error message is "Post must have at least one image"', () => {
                expect(error.message).toEqual('Post must have at least one image');
            });
            it('Error info detail code is POST_MUST_HAVE_IMAGE', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.POST_MUST_HAVE_IMAGE);
            });
        });
        describe('Submit more than 10 pictures', () => {
            beforeAll(async () => {
                input = {
                    images: [
                        {
                            fieldname: 'images',
                            originalname: 'test1.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 1'),
                            size: 67418,
                        },
                        {
                            fieldname: 'images',
                            originalname: 'test2.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 2'),
                            size: 67418,
                        },
                        {
                            fieldname: 'images',
                            originalname: 'test3.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 3'),
                            size: 67418,
                        },
                        {
                            fieldname: 'images',
                            originalname: 'test4.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 4'),
                            size: 67418,
                        },
                        {
                            fieldname: 'images',
                            originalname: 'test5.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 5'),
                            size: 67418,
                        },
                        {
                            fieldname: 'images',
                            originalname: 'test6.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 6'),
                            size: 67418,
                        },
                        {
                            fieldname: 'images',
                            originalname: 'test7.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 7'),
                            size: 67418,
                        },
                        {
                            fieldname: 'images',
                            originalname: 'test8.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 8'),
                            size: 67418,
                        },
                        {
                            fieldname: 'images',
                            originalname: 'test9.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 9'),
                            size: 67418,
                        },
                        {
                            fieldname: 'images',
                            originalname: 'test10.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 10'),
                            size: 67418,
                        },
                        {
                            fieldname: 'images',
                            originalname: 'test11.jpeg',
                            encoding: '7bit',
                            mimetype: 'image/jpeg',
                            buffer: Buffer.from('test image 11'),
                            size: 67418,
                        },
                    ],
                };
                jest.spyOn(user_1.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_2.UserEntity, {
                    id: 1,
                    email: 'test@mail.com',
                    userName: 'userName',
                    detail: null,
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
            it('Error message is "Post can have maximum 10 pictures"', () => {
                expect(error.message).toEqual('Post can have maximum 10 pictures');
            });
            it('Error info detailCode is NUMBER_OF_PICS_LIMITED', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.NUMBER_OF_PICS_LIMITED);
            });
        });
    });
    describe('Normal case', () => {
        beforeAll(async () => {
            input = {
                content: 'Post content',
                tags: ['tag-1', 'tag-2'],
                images: [
                    {
                        fieldname: 'images',
                        originalname: 'test1.jpeg',
                        encoding: '7bit',
                        mimetype: 'image/jpeg',
                        buffer: Buffer.from('test image 1'),
                        size: 67418,
                    },
                    {
                        fieldname: 'images',
                        originalname: 'test2.jpeg',
                        encoding: '7bit',
                        mimetype: 'image/jpeg',
                        buffer: Buffer.from('test image 2'),
                        size: 67418,
                    },
                ],
            };
            jest.spyOn(user_1.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_2.UserEntity, {
                id: 1,
                email: 'test@mail.com',
                userName: 'userName',
                detail: null,
            }));
            jest.spyOn(post_1.PostRepository.prototype, 'save').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                id: 1,
                likes: [],
                comments: [],
                tags: ['tag-1', 'tag-2'],
                content: 'Post content',
                images: [],
                userId: 1,
                createdAt: new Date('2023-01-07 00:00:00'),
            }));
            jest.spyOn(post_1.PostRepository.prototype, 'update').mockResolvedValue((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                id: 1,
                likes: [],
                comments: [],
                tags: ['tag-1', 'tag-2'],
                content: 'Post content',
                images: [{ url: 'image-1.jpeg' }, { url: 'image-2.jpeg' }],
                userId: 1,
                createdAt: new Date('2023-01-07 00:00:00'),
            }));
            jest
                .spyOn(image_1.default.prototype, 'generateKey')
                .mockImplementation((_domainImageType, payload) => {
                if (payload.name === 'test1.jpeg') {
                    return 'test1-key.jpeg';
                }
                return 'test2-key.jpeg';
            });
            jest
                .spyOn(image_1.default.prototype, 'generateGetURL')
                .mockImplementation((key) => {
                if (key === 'test1-key.jpeg') {
                    return 'https://s3.aws.com/users/1/posts/1/test1-key.jpeg';
                }
                return 'https://s3.aws.com/users/1/posts/1/test2-key.jpeg';
            });
            jest
                .spyOn(image_1.default.prototype, 'uploadImageToImageServer')
                .mockResolvedValue(null);
            output = await usecase.execute(input, userId);
        });
        it('Outputs post data type is PostDto', () => {
            expect(output.post).toBeInstanceOf(_1.CreatedPostDto);
        });
        it('Outputs post data is as expected', () => {
            expect(output.post).toEqual({
                id: 1,
                images: [
                    'https://s3.aws.com/users/1/posts/1/test1-key.jpeg',
                    'https://s3.aws.com/users/1/posts/1/test2-key.jpeg',
                ],
                tags: ['tag-1', 'tag-2'],
                content: 'Post content',
                createdAt: new Date('2023-01-07 00:00:00'),
            });
        });
        it('Output result code is OK', () => {
            expect(output.result.code).toBe(api_result_1.ApiResultCode.OK);
        });
    });
});
//# sourceMappingURL=index.spec.js.map