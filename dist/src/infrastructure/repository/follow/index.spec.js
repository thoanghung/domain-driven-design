"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const follow_1 = require("@infrastructure/rdb/entity/follow");
const user_1 = require("@infrastructure/rdb/entity/user");
const _1 = require(".");
const follow_2 = require("@domain/entity/follow");
const testData_1 = require("./testData");
const class_transformer_1 = require("@nestjs/class-transformer");
describe('Follow Repository Testing', () => {
    const followRepository = new _1.FollowRepository();
    let rdbConnection;
    let followRDBRepository;
    let userRDBRepository;
    let result;
    let followRDBEntity;
    let followId;
    beforeAll(async () => {
        rdbConnection = await (0, typeorm_1.createConnection)();
        followRDBRepository = (0, typeorm_1.getRepository)(follow_1.default);
        userRDBRepository = (0, typeorm_1.getRepository)(user_1.default);
        await followRDBRepository.delete({});
        await userRDBRepository.delete({});
        await userRDBRepository.insert(testData_1.users);
        await followRDBRepository.insert(testData_1.follows);
    });
    afterAll(async () => {
        await followRDBRepository.delete({});
        await userRDBRepository.delete({});
        await rdbConnection.close();
    });
    describe('getById testing', () => {
        describe('Normal case', () => {
            describe('Can get follow with exist id', () => {
                beforeAll(async () => {
                    followId = 1;
                    result = await followRepository.getById(null, followId);
                });
                it('Follow data is as expected', () => {
                    expect(result).toEqual((0, class_transformer_1.plainToClass)(follow_2.FollowEntity, {
                        id: 1,
                        sourceUserId: 1,
                        destinationUserId: 2,
                    }));
                });
            });
            describe('Can not get anything with not exist follow id', () => {
                beforeAll(async () => {
                    followId = 100;
                    result = await followRepository.getById(null, followId);
                });
                it('null is returned', () => {
                    expect(result).toBeNull();
                });
            });
        });
    });
    describe('getByUserIds testing', () => {
        describe('Normal case', () => {
            describe('Can get follow between two users whose have relationship', () => {
                beforeAll(async () => {
                    result = await followRepository.getByUserIds(null, 1, 2);
                });
                it('Follow data is as expected', () => {
                    expect(result).toEqual((0, class_transformer_1.plainToClass)(follow_2.FollowEntity, {
                        id: 1,
                        sourceUserId: 1,
                        destinationUserId: 2,
                    }));
                });
            });
        });
        describe('Abnormal case', () => {
            describe('Can not get follow between two users whose do not have any relationships', () => {
                beforeAll(async () => {
                    result = await followRepository.getByUserIds(null, 2, 3);
                });
                it('null is returned', () => {
                    expect(result).toBeNull();
                });
            });
        });
    });
    describe('save testing', () => {
        describe('Normal case', () => {
            beforeAll(async () => {
                result = await followRepository.save(null, (0, class_transformer_1.plainToClass)(follow_2.FollowEntity, {
                    sourceUserId: 2,
                    destinationUserId: 3,
                }));
                followRDBEntity = await followRDBRepository.findOne({
                    sourceUserId: 2,
                    destinationUserId: 3,
                });
            });
            it('Follow record is saved into database', () => {
                expect(followRDBEntity).toEqual({
                    id: expect.any(Number),
                    sourceUserId: 2,
                    destinationUserId: 3,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                });
            });
            it('FollowEntity is returned', () => {
                expect(result).toEqual({
                    id: expect.any(Number),
                    sourceUserId: 2,
                    destinationUserId: 3,
                });
                expect(result).toBeInstanceOf(follow_2.FollowEntity);
            });
        });
    });
    describe('deleteById testing', () => {
        describe('Normal case', () => {
            beforeAll(async () => {
                followId = 1;
                await followRepository.deleteById(null, followId);
                followRDBEntity = await followRDBRepository.findOne({ id: followId });
            });
            it('Follow record is deleted from database', () => {
                expect(followRDBEntity).toBe(undefined);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map