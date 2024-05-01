"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("@nestjs/class-transformer");
const typeorm_1 = require("typeorm");
const exception_1 = require("@domain/exception");
const user_1 = require("@domain/entity/user");
const user_detail_1 = require("@domain/entity/user/user-detail");
const authenticate_1 = require("@infrastructure/repository/authenticate");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_2 = require("@infrastructure/repository/user");
const exception_2 = require("@usecase/exception");
const _1 = require(".");
const api_result_1 = require("@usecase/dto/api-result");
describe('UpdatePassword Usecase testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    beforeAll(async () => {
        usecase = new _1.default(new authenticate_1.AuthenticateRepository(), new user_2.UserRepository(), new transaction_1.default());
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
                    newPassword: 'newPass',
                    currentPassword: 'currentPass',
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue(null);
                try {
                    await usecase.execute(input, 1);
                }
                catch (e) {
                    error = e;
                }
            });
            it('Error code is NOT_FOUND', () => {
                expect(error.code).toEqual(exception_2.UsecaseErrorCode.NOT_FOUND);
            });
            it('Error message is "User does not exist"', () => {
                expect(error.message).toEqual('User does not exist');
            });
            it('Error info errorCode is USER_NOT_EXIST', () => {
                expect(error.info.detailCode).toEqual(exception_2.UsecaseErrorDetailCode.USER_NOT_EXIST);
            });
            it('Error info userId is 1', () => {
                expect(error.info.userId).toEqual(1);
            });
        });
        describe('Current password does not match', () => {
            beforeAll(async () => {
                input = {
                    currentPassword: 'notmatchpass',
                    newPassword: 'newpass',
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
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
                }));
                jest
                    .spyOn(authenticate_1.AuthenticateRepository.prototype, 'validatePassword')
                    .mockResolvedValue(false);
                try {
                    await usecase.execute(input, 1);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_2.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error message is "Current password does not match"', () => {
                expect(error.message).toEqual('Current password does not match');
            });
            it('Error info errorCode is CURRENT_PASS_NOT_MATCH', () => {
                expect(error.info.detailCode).toEqual(exception_2.UsecaseErrorDetailCode.CURRENT_PASS_NOT_MATCH);
            });
        });
        describe('Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters error occurs', () => {
            beforeAll(async () => {
                input = {
                    currentPassword: 'currentPass',
                    newPassword: 'newpass',
                };
                jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
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
                }));
                jest
                    .spyOn(authenticate_1.AuthenticateRepository.prototype, 'validatePassword')
                    .mockResolvedValue(true);
                try {
                    await usecase.execute(input, 1);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.DomainErrorCode.BAD_REQUEST);
            });
            it('Error message is "Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters"', () => {
                expect(error.message).toEqual('Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters');
            });
            it('Error info errorCode is CURRENT_PASS_NOT_MATCH', () => {
                expect(error.info.detailCode).toEqual(exception_1.DomainErrorDetailCode.INVALID_PASSWORD_FORMAT);
            });
        });
    });
    describe('Normal case', () => {
        beforeAll(async () => {
            input = {
                currentPassword: 'currentPassword',
                newPassword: 'TestPassword@123',
            };
            jest.spyOn(user_2.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
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
            }));
            jest
                .spyOn(authenticate_1.AuthenticateRepository.prototype, 'validatePassword')
                .mockResolvedValue(true);
            jest.spyOn(user_2.UserRepository.prototype, 'update').mockResolvedValue((0, class_transformer_1.plainToClass)(user_1.UserEntity, {
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
            }));
            output = await usecase.execute(input, 1);
        });
        it('Output result code is OK', () => {
            expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
        });
    });
});
//# sourceMappingURL=index.spec.js.map