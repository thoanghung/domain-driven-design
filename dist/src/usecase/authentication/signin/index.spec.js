"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const _1 = require(".");
const authenticate_1 = require("@infrastructure/repository/authenticate");
const user_1 = require("@infrastructure/repository/user");
const exception_1 = require("@usecase/exception");
const class_transformer_1 = require("@nestjs/class-transformer");
const user_2 = require("@domain/entity/user");
const testData_1 = require("./testData");
const api_result_1 = require("@usecase/dto/api-result");
describe('Signin Usecase Testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    beforeAll(async () => {
        usecase = new _1.default(new user_1.UserRepository(), new authenticate_1.AuthenticateRepository());
        connection = await (0, typeorm_1.createConnection)();
    });
    afterAll(async () => {
        connection.close();
    });
    describe('Normal case', () => {
        describe('Email and password match to each other', () => {
            beforeAll(async () => {
                input = { email: 'test@mail.com', password: '123456' };
                jest
                    .spyOn(user_1.UserRepository.prototype, 'getByEmail')
                    .mockResolvedValue((0, class_transformer_1.plainToClass)(user_2.UserEntity, testData_1.userEntity));
                jest
                    .spyOn(authenticate_1.AuthenticateRepository.prototype, 'validatePassword')
                    .mockResolvedValue(true);
                jest
                    .spyOn(authenticate_1.AuthenticateRepository.prototype, 'getJWT')
                    .mockReturnValue(testData_1.testJWT);
                output = await usecase.execute(input);
            });
            it('JWT will be returned', () => {
                expect(output.data.jwt).toEqual(testData_1.testJWT);
            });
            it('Api result code is OK', () => {
                expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
            });
        });
    });
    describe('Abnormal case', () => {
        let error;
        describe('Not provide email when calling', () => {
            beforeAll(async () => {
                input = { email: '', password: '123456' };
                try {
                    await usecase.execute(input);
                }
                catch (e) {
                    error = e;
                }
            });
            it('"Must specify email and password" error message will be returned', () => {
                expect(error.message).toEqual('Must specify email and password');
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error detail code is MUST_SPECIFY_EMAIL_AND_PASSWORD', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.MUST_SPECIFY_EMAIL_AND_PASSWORD);
            });
        });
        describe('Not provide password when calling', () => {
            beforeAll(async () => {
                input = { email: 'test@mail.com', password: '' };
                try {
                    await usecase.execute(input);
                }
                catch (e) {
                    error = e;
                }
            });
            it('"Must specify email and password" error message will be returned', () => {
                expect(error.message).toEqual('Must specify email and password');
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error detail code is MUST_SPECIFY_EMAIL_AND_PASSWORD', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.MUST_SPECIFY_EMAIL_AND_PASSWORD);
            });
        });
        describe('Not provide email and password when calling', () => {
            beforeAll(async () => {
                input = { email: '', password: '' };
                try {
                    await usecase.execute(input);
                }
                catch (e) {
                    error = e;
                }
            });
            it('"Must specify email and password" error message will be returned', () => {
                expect(error.message).toEqual('Must specify email and password');
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error detail code is MUST_SPECIFY_EMAIL_AND_PASSWORD', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.MUST_SPECIFY_EMAIL_AND_PASSWORD);
            });
        });
        describe('Email does not exist', () => {
            beforeAll(async () => {
                input = { email: 'fail-test@mail.com', password: '123456' };
                jest
                    .spyOn(user_1.UserRepository.prototype, 'getByEmail')
                    .mockResolvedValue(null);
                try {
                    await usecase.execute(input);
                }
                catch (e) {
                    error = e;
                }
            });
            it('"Email does not exist" error message will be returend', () => {
                expect(error.message).toEqual('Email does not exist');
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error detail code is EMAIL_DOES_NOT_EXISTS', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.EMAIL_DOES_NOT_EXISTS);
            });
        });
        describe('Email and password do not match to each other', () => {
            beforeAll(async () => {
                input = { email: 'test@mail.com', password: '123456' };
                jest
                    .spyOn(user_1.UserRepository.prototype, 'getByEmail')
                    .mockResolvedValue((0, class_transformer_1.plainToClass)(user_2.UserEntity, testData_1.userEntity));
                jest
                    .spyOn(authenticate_1.AuthenticateRepository.prototype, 'validatePassword')
                    .mockResolvedValue(false);
                try {
                    await usecase.execute(input);
                }
                catch (e) {
                    error = e;
                }
            });
            it('"Invalid email or password" error message will be returend', () => {
                expect(error.message).toEqual('Invalid email or password');
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error detail code is INVALID_EMAIL_OR_PASSWORD', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.INVALID_EMAIL_OR_PASSWORD);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map