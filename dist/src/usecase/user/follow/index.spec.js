"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("@nestjs/class-transformer");
const typeorm_1 = require("typeorm");
const user_1 = require("@domain/entity/user");
const user_detail_1 = require("@domain/entity/user/user-detail");
const exception_1 = require("@usecase/exception");
const follow_1 = require("@infrastructure/repository/follow");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_2 = require("@infrastructure/repository/user");
const _1 = require(".");
const follow_2 = require("@domain/entity/follow");
const api_result_1 = require("@usecase/dto/api-result");
describe('FollowUser Usecase testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    const sourceUserId = 1;
    beforeAll(async () => {
        usecase = new _1.default(new user_2.UserRepository(), new follow_1.FollowRepository(), new transaction_1.default());
        connection = await (0, typeorm_1.createConnection)();
    });
    afterAll(async () => {
        await connection.close();
    });
    describe('Abnormal case', () => {
        let error;
        describe('Can not follow myself', () => {
            beforeAll(async () => {
                input = {
                    destinationUserId: 1,
                };
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
            it('Error message is "You can not follow yourself"', () => {
                expect(error.message).toEqual('You can not follow yourself');
            });
            it('Error info detailCode is CAN_NOT_FOLLOW_MYSELF', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.CAN_NOT_FOLLOW_MYSELF);
            });
        });
        describe('Source user does not exist', () => {
            beforeAll(async () => {
                input = {
                    destinationUserId: 2,
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
            it('Error info includes source user id', () => {
                expect(error.info.userId).toEqual(sourceUserId);
            });
        });
        describe('Destination user does not exist', () => {
            const destinationUserId = 2;
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
            it('Error info includes destination user id', () => {
                expect(error.info.userId).toEqual(destinationUserId);
            });
        });
        describe('Have been following user', () => {
            const destinationUserId = 2;
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
                            nickName: 'nickName',
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
                            nickName: 'nickName',
                            avatarURL: 'avatarURL',
                            gender: user_detail_1.UserDetailGender.Male,
                            active: true,
                        },
                    }),
                ]);
                jest
                    .spyOn(follow_1.FollowRepository.prototype, 'getByUserIds')
                    .mockResolvedValue((0, class_transformer_1.plainToClass)(follow_2.FollowEntity, {
                    id: 1,
                    sourceUserId: 1,
                    destinationUserId: 2,
                }));
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
            it('Error message is "You are following this user"', () => {
                expect(error.message).toEqual('You are following this user');
            });
            it('Error info detailCode is HAVE_BEEN_FOLLOWING_USER', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.HAVE_BEEN_FOLLOWING_USER);
            });
        });
    });
    describe('Normal case', () => {
        describe('Can follow another user', () => {
            const destinationUserId = 2;
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
                            nickName: 'nickName',
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
                            nickName: 'nickName',
                            avatarURL: 'avatarURL',
                            gender: user_detail_1.UserDetailGender.Male,
                            active: true,
                        },
                    }),
                ]);
                jest
                    .spyOn(follow_1.FollowRepository.prototype, 'getByUserIds')
                    .mockResolvedValue(null);
                jest.spyOn(follow_1.FollowRepository.prototype, 'save').mockResolvedValue(null);
                output = await usecase.execute(input, sourceUserId);
            });
            it('Output result code is OK', () => {
                expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map