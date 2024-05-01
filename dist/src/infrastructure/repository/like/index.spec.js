"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const _1 = require(".");
const like_1 = require("@domain/entity/post/like");
const like_2 = require("@infrastructure/rdb/entity/like");
const post_1 = require("@infrastructure/rdb/entity/post");
const user_1 = require("@infrastructure/rdb/entity/user");
const testData_1 = require("./testData");
const class_transformer_1 = require("@nestjs/class-transformer");
describe('Like Repository Testing', () => {
    const likeRepository = new _1.LikeRepository();
    let rdbConnection;
    let likeRDBRepository;
    let postRDBRepository;
    let userRDBRepository;
    let postId;
    let userId;
    let likeId;
    let rdbLike;
    let result;
    beforeAll(async () => {
        rdbConnection = await (0, typeorm_1.createConnection)();
        likeRDBRepository = (0, typeorm_1.getRepository)(like_2.default);
        postRDBRepository = (0, typeorm_1.getRepository)(post_1.default);
        userRDBRepository = (0, typeorm_1.getRepository)(user_1.default);
        await likeRDBRepository.delete({});
        await postRDBRepository.delete({});
        await userRDBRepository.delete({});
        await userRDBRepository.insert(testData_1.users);
        await postRDBRepository.insert(testData_1.posts);
        await likeRDBRepository.insert(testData_1.likes);
    });
    afterAll(async () => {
        await likeRDBRepository.delete({});
        await postRDBRepository.delete({});
        await userRDBRepository.delete({});
        await rdbConnection.close();
    });
    describe('getById testing', () => {
        describe('Normal case', () => {
            describe('Can get like that has exist id', () => {
                beforeAll(async () => {
                    likeId = 1;
                    result = await likeRepository.getById(null, likeId);
                });
                it('Result data is as expected', () => {
                    expect(result).toEqual({
                        id: 1,
                        postId: 1,
                        userId: 1,
                    });
                });
                it('Result data type is LikeEntity', () => {
                    expect(result).toBeInstanceOf(like_1.LikeEntity);
                });
            });
            describe('Can not get like that has non-exist id', () => {
                beforeAll(async () => {
                    likeId = 100;
                    result = await likeRepository.getById(null, likeId);
                });
                it('Result is null', () => {
                    expect(result).toBeNull();
                });
            });
        });
    });
    describe('getByPostAndUserId testing', () => {
        describe('Normal case', () => {
            describe('Can get like of post', () => {
                beforeAll(async () => {
                    postId = 1;
                    userId = 1;
                    result = await likeRepository.getByPostAndUserId(null, postId, userId);
                });
                it('Result data is as expected', () => {
                    expect(result).toEqual({
                        id: 1,
                        postId: 1,
                        userId: 1,
                    });
                });
                it('Result data type is LikeEntity', () => {
                    expect(result).toBeInstanceOf(like_1.LikeEntity);
                });
            });
            describe('Can not get like of post', () => {
                beforeAll(async () => {
                    postId = 4;
                    userId = 1;
                    result = await likeRepository.getByPostAndUserId(null, postId, userId);
                });
                it('Result is null', () => {
                    expect(result).toBeNull();
                });
            });
        });
    });
    describe('save testing', () => {
        beforeAll(async () => {
            postId = 4;
            userId = 1;
            result = await likeRepository.save(null, (0, class_transformer_1.plainToClass)(like_1.LikeEntity, {
                postId,
                userId,
            }));
            rdbLike = await likeRDBRepository.findOne({ postId, userId });
        });
        it('Result data is as expected', () => {
            expect(result).toEqual({
                id: expect.any(Number),
                postId,
                userId,
            });
        });
        it('Result data type is LikeEntity', () => {
            expect(result).toBeInstanceOf(like_1.LikeEntity);
        });
        it('Data is saved to database', () => {
            expect(rdbLike).toEqual({
                id: expect.any(Number),
                postId,
                userId,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        });
    });
    describe('deleteById testing', () => {
        beforeAll(async () => {
            likeId = 1;
            await likeRepository.deleteById(null, likeId);
            rdbLike = await likeRDBRepository.findOne({ id: likeId });
        });
        it('Data is deleted from database', () => {
            expect(rdbLike).toBe(undefined);
        });
    });
});
//# sourceMappingURL=index.spec.js.map