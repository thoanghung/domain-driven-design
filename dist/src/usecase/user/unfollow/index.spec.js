"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("@nestjs/class-transformer");
const typeorm_1 = require("typeorm");
const user_1 = require("@domain/entity/user");
const user_detail_1 = require("@domain/entity/user/user-detail");
const follow_1 = require("@domain/entity/follow");
const follow_2 = require("@infrastructure/repository/follow");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_2 = require("@infrastructure/repository/user");
const exception_1 = require("@usecase/exception");
const _1 = require(".");
const api_result_1 = require("@usecase/dto/api-result");
describe('UnfollowUser Usecase Testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    const destinationUserId = 2;
    const sourceUserId = 1;
    beforeAll(async () => {
        usecase = new _1.default(new user_2.UserRepository(), new follow_2.FollowRepository(), new transaction_1.default());
        connection = await (0, typeorm_1.createConnection)();
    });
    afterAll(async () => {
        await connection.close();
    });
    describe('Abnormal case', () => {
        let error;
        describe('Source user does not exist error', () => {
            beforeAll(async () => {
                input = {
                    destinationUserId,
                };
                jest
                    .spyOn(user_2.UserRepository.prototype, 'getByIds')
                    .mockResolvedValue([null, null]);
                try {
                    await usecase.execute(input, sourceUserId);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is NOT_FOUND', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.NOT_FOUND);
            });
            it('Error message is "Source user does not exist"', () => {
                expect(error.message).toEqual('Source user does not exist');
            });
            it('Error info detailCode is SOURCE_USER_NOT_EXIST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.SOURCE_USER_NOT_EXIST);
            });
        });
        describe('Destination user does not exist error', () => {
            beforeAll(async () => {
                input = {
                    destinationUserId,
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getByIds').mockResolvedValue([
                    (0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                        id: 1,
                        email: 'test-haha@mail.com',
                        userName: 'userName',
                        detail: {
                            id: 1,
                            nickName: 'nickName',
                            avatarURL: 'avatarURL',
                            gender: user_detail_1.UserDetailGender.Male,
                            active: true,
                        },
                    }),
                    null,
                ]);
                try {
                    await usecase.execute(input, sourceUserId);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is NOT_FOUND', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.NOT_FOUND);
            });
            it('Error message is "Destination user does not exist"', () => {
                expect(error.message).toEqual('Destination user does not exist');
            });
            it('Error info detailCode is DESTINATION_USER_NOT_EXIST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.DESTINATION_USER_NOT_EXIST);
            });
        });
        describe('You are not following this user', () => {
            beforeAll(async () => {
                input = {
                    destinationUserId,
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getByIds').mockResolvedValue([
                    (0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                        id: 1,
                        email: 'user1@mail.com',
                        userName: 'userName1',
                        detail: {
                            id: 1,
                            nickName: 'nickName1',
                            avatarURL: 'avatarURL',
                            gender: user_detail_1.UserDetailGender.Male,
                            active: true,
                        },
                    }),
                    (0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                        id: 2,
                        email: 'user2@mail.com',
                        userName: 'userName2',
                        detail: {
                            id: 2,
                            nickName: 'nickName2',
                            avatarURL: 'avatarURL',
                            gender: user_detail_1.UserDetailGender.Male,
                            active: true,
                        },
                    }),
                ]);
                jest
                    .spyOn(follow_2.FollowRepository.prototype, 'getByUserIds')
                    .mockResolvedValue(null);
                try {
                    await usecase.execute(input, sourceUserId);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error message is "You are not following this user"', () => {
                expect(error.message).toEqual('You are not following this user');
            });
            it('Error info detailCode is NOT_FOLLOWING_USER', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.NOT_FOLLOWING_USER);
            });
        });
    });
    describe('Normal case', () => {
        beforeAll(async () => {
            input = {
                destinationUserId,
            };
            jest.spyOn(user_2.UserRepository.prototype, 'getByIds').mockResolvedValue([
                (0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 1,
                    email: 'user1@mail.com',
                    userName: 'userName1',
                    detail: {
                        id: 1,
                        nickName: 'nickName1',
                        avatarURL: 'avatarURL',
                        gender: user_detail_1.UserDetailGender.Male,
                        active: true,
                    },
                }),
                (0, class_transformer_1.plainToClass)(user_1.UserEntity, {
                    id: 2,
                    email: 'user2@mail.com',
                    userName: 'userName2',
                    detail: {
                        id: 2,
                        nickName: 'nickName2',
                        avatarURL: 'avatarURL',
                        gender: user_detail_1.UserDetailGender.Male,
                        active: true,
                    },
                }),
            ]);
            jest.spyOn(follow_2.FollowRepository.prototype, 'getByUserIds').mockResolvedValue((0, class_transformer_1.plainToClass)(follow_1.FollowEntity, {
                id: 1,
                sourceUserId: 1,
                destinationUserId: 2,
            }));
            jest
                .spyOn(follow_2.FollowRepository.prototype, 'deleteById')
                .mockResolvedValue(null);
            output = await usecase.execute(input, sourceUserId);
        });
        it('Response code is OK', () => {
            expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
        });
    });
});
//# sourceMappingURL=index.spec.js.map