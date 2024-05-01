"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const _1 = require(".");
const like_1 = require("@infrastructure/rdb/entity/like");
const post_1 = require("@infrastructure/rdb/entity/post");
const user_1 = require("@infrastructure/rdb/entity/user");
const comment_1 = require("@infrastructure/rdb/entity/comment");
const testData_1 = require("./testData");
describe('Post View Repository testing', () => {
    const postViewRepository = new _1.default();
    let result;
    let rdbConnection;
    let userRDBRepository;
    let postRDBRepository;
    let commentRDBRepository;
    let likeRDBRepository;
    beforeAll(async () => {
        rdbConnection = await (0, typeorm_1.createConnection)();
        userRDBRepository = (0, typeorm_1.getRepository)(user_1.default);
        postRDBRepository = (0, typeorm_1.getRepository)(post_1.default);
        commentRDBRepository = (0, typeorm_1.getRepository)(comment_1.default);
        likeRDBRepository = (0, typeorm_1.getRepository)(like_1.default);
        await likeRDBRepository.delete({});
        await commentRDBRepository.delete({});
        await postRDBRepository.delete({});
        await userRDBRepository.delete({});
        await userRDBRepository.insert(testData_1.users);
        await postRDBRepository.insert(testData_1.posts);
        await commentRDBRepository.insert(testData_1.comments);
        await likeRDBRepository.insert(testData_1.likes);
    });
    afterAll(async () => {
        await likeRDBRepository.delete({});
        await commentRDBRepository.delete({});
        await postRDBRepository.delete({});
        await userRDBRepository.delete({});
        await rdbConnection.close();
    });
    describe('getPostDetail testing', () => {
        let postId;
        describe('Pass an existing post id', () => {
            beforeAll(async () => {
                postId = 1;
                result = await postViewRepository.getPostDetail(postId);
            });
            it('Can get post detail', () => {
                const expectData = {
                    id: 1,
                    content: 'Post 1 content',
                    tags: ['post1-tag1', 'post1-tag2'],
                    images: ['post1-img1-url', 'post1-img2-url'],
                    user: {
                        id: 1,
                        userName: 'user1',
                    },
                    likes: [
                        {
                            id: 1,
                            user: {
                                id: 1,
                                userName: 'user1',
                            },
                        },
                        {
                            id: 2,
                            user: {
                                id: 2,
                                userName: 'user2',
                            },
                        },
                    ],
                    comments: [
                        {
                            id: 1,
                            content: 'Comment-1',
                            createdAt: new Date('2023-01-19 00:00:00'),
                            user: {
                                id: 1,
                                userName: 'user1',
                            },
                        },
                    ],
                    createdAt: new Date('2023-01-04 00:00:00'),
                };
                expect(result).toEqual(expectData);
            });
        });
        describe('Pass a non existing post id', () => {
            beforeAll(async () => {
                postId = 100;
                result = await postViewRepository.getPostDetail(postId);
            });
            it('null will be returned', () => {
                expect(result).toBeNull();
            });
        });
    });
    describe('getUserPosts testing', () => {
        let userId;
        describe('User does not have any posts', () => {
            beforeAll(async () => {
                userId = 3;
                result = await postViewRepository.getUserPosts(userId);
            });
            it('Empty array is returned', () => {
                expect(result).toEqual([]);
            });
        });
        describe('User has only one post', () => {
            beforeAll(async () => {
                userId = 2;
                result = await postViewRepository.getUserPosts(userId);
            });
            it('UserPostDto array that has only one item will be returned', () => {
                expect(result).toEqual([
                    {
                        id: 5,
                        likesCount: 1,
                        commentsCount: 2,
                        thumbnail: 'post5-img1-url',
                    },
                ]);
            });
        });
        describe('User has more than one post', () => {
            beforeAll(async () => {
                userId = 1;
                result = await postViewRepository.getUserPosts(userId);
            });
            it('UserPostsDto array is returned', () => {
                expect(result).toEqual([
                    {
                        id: 1,
                        likesCount: 2,
                        commentsCount: 1,
                        thumbnail: 'post1-img1-url',
                    },
                    {
                        id: 2,
                        likesCount: 0,
                        commentsCount: 1,
                        thumbnail: 'post2-img1-url',
                    },
                    {
                        id: 3,
                        likesCount: 0,
                        commentsCount: 1,
                        thumbnail: 'post3-img1-url',
                    },
                    {
                        id: 4,
                        likesCount: 0,
                        commentsCount: 0,
                        thumbnail: 'post4-img1-url',
                    },
                ]);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map