"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("@nestjs/class-transformer");
const _1 = require(".");
const testData_1 = require("./testData");
const post_1 = require("@infrastructure/rdb/entity/post");
const user_1 = require("@infrastructure/rdb/entity/user");
const post_2 = require("@domain/entity/post");
const exception_1 = require("@infrastructure/exception");
describe('Post Repository Testing', () => {
    const postRepository = new _1.PostRepository();
    let rdbConnection;
    let postRDBRepository;
    let userRDBRepository;
    let result;
    let rdbPost;
    beforeAll(async () => {
        rdbConnection = await (0, typeorm_1.createConnection)();
        postRDBRepository = (0, typeorm_1.getRepository)(post_1.default);
        userRDBRepository = (0, typeorm_1.getRepository)(user_1.default);
        await postRDBRepository.delete({});
        await userRDBRepository.delete({});
        await userRDBRepository.insert(testData_1.users);
        await postRDBRepository.insert(testData_1.posts);
    });
    afterAll(async () => {
        await postRDBRepository.delete({});
        await userRDBRepository.delete({});
        await rdbConnection.close();
    });
    describe('getById testing', () => {
        let postId;
        describe('Normal case', () => {
            beforeAll(async () => {
                postId = 1;
                result = await postRepository.getById(null, postId);
            });
            it('Can get post with existing id', () => {
                expect(result).toEqual((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    content: 'Post 1 content',
                    tags: ['post1-tag1', 'post1-tag2'],
                    images: ['post1-img1-url', 'post1-img2-url'],
                    likes: [],
                    comments: [],
                    createdAt: new Date('2023-01-04 00:00:00'),
                    userId: 1,
                }));
            });
        });
        describe('Abnormal case', () => {
            beforeAll(async () => {
                postId = 100;
                result = await postRepository.getById(null, postId);
            });
            it('Can not get post with non-existing id', () => {
                expect(result).toBe(null);
            });
        });
    });
    describe('save testing', () => {
        describe('Normal case', () => {
            beforeAll(async () => {
                result = await postRepository.save(null, (0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    content: 'Post content',
                    tags: ['tag-1', 'tag-2'],
                    images: ['url-1', 'url-2'],
                    likes: [],
                    comments: [],
                    userId: 1,
                }));
                rdbPost = await postRDBRepository.findOne({ id: result.id });
            });
            it('Can save post to database', () => {
                expect(rdbPost).toEqual({
                    id: expect.any(Number),
                    content: 'Post content',
                    tags: { list: ['tag-1', 'tag-2'] },
                    images: { list: ['url-1', 'url-2'] },
                    userId: 1,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                });
            });
            it('Response a post entity', () => {
                expect(result).toEqual({
                    id: expect.any(Number),
                    content: 'Post content',
                    tags: ['tag-1', 'tag-2'],
                    images: ['url-1', 'url-2'],
                    likes: [],
                    comments: [],
                    userId: 1,
                    createdAt: expect.any(Date),
                });
                expect(result).toBeInstanceOf(post_2.PostEntity);
            });
        });
    });
    describe('update testing', () => {
        describe('Normal case', () => {
            beforeAll(async () => {
                result = await postRepository.update(null, (0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    content: 'Post 1 new content',
                    tags: ['post1-tag1', 'post1-tag2', 'post1-tag3'],
                    images: ['post1-img1-url'],
                }));
                rdbPost = await postRDBRepository.findOne({ id: 1 });
            });
            it('Post data is updated', () => {
                expect(rdbPost).toEqual({
                    id: 1,
                    content: 'Post 1 new content',
                    tags: { list: ['post1-tag1', 'post1-tag2', 'post1-tag3'] },
                    images: { list: ['post1-img1-url'] },
                    userId: 1,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                });
            });
            it('Post entity is responsed', () => {
                expect(result).toEqual((0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                    id: 1,
                    content: 'Post 1 new content',
                    tags: ['post1-tag1', 'post1-tag2', 'post1-tag3'],
                    images: ['post1-img1-url'],
                    likes: [],
                    comments: [],
                    userId: 1,
                    createdAt: new Date('2023-01-04 00:00:00'),
                }));
                expect(result).toBeInstanceOf(post_2.PostEntity);
            });
        });
        describe('Abnormal case', () => {
            let error;
            describe('Not specify post id', () => {
                beforeAll(async () => {
                    try {
                        await postRepository.update(null, (0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                            content: 'Post content',
                            tags: [],
                            images: [],
                            userId: 1,
                        }));
                    }
                    catch (err) {
                        error = err;
                    }
                });
                it('Error code is BAD_REQUEST', () => {
                    expect(error.code).toEqual(exception_1.InfrastructureErrorCode.BAD_REQUEST);
                });
                it('Error message is: "Must specify post id"', () => {
                    expect(error.message).toEqual('Must specify post id');
                });
                it('Error info detail code is MUST_SPECIFY_POST_ID', () => {
                    expect(error.info.detailCode).toEqual(exception_1.InfrastructureErrorDetailCode.MUST_SPECIFY_POST_ID);
                });
            });
            describe('Post does not exist', () => {
                beforeAll(async () => {
                    try {
                        await postRepository.update(null, (0, class_transformer_1.plainToClass)(post_2.PostEntity, {
                            id: 100000,
                            content: 'content',
                            tags: [],
                            images: [],
                            userId: 1,
                        }));
                    }
                    catch (err) {
                        error = err;
                    }
                });
                it('Error code is NOT_FOUND', () => {
                    expect(error.code).toEqual(exception_1.InfrastructureErrorCode.NOT_FOUND);
                });
                it('Error message is "Post does not exist"', () => {
                    expect(error.message).toEqual('Post does not exist');
                });
                it('Error info detail code is RDB_POST_NOT_EXIST', () => {
                    expect(error.info.detailCode).toEqual(exception_1.InfrastructureErrorDetailCode.RDB_POST_NOT_EXIST);
                });
            });
        });
    });
    describe('delete testing', () => {
        describe('Normal case', () => {
            const postId = 5;
            let postRDBEntity;
            beforeAll(async () => {
                await postRepository.deleteById(null, postId);
                postRDBEntity = await postRDBRepository.findOne({ id: postId });
            });
            it('Data is deleted from DB', () => {
                expect(postRDBEntity).toBeUndefined();
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map