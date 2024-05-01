"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const authenticate_1 = require("@infrastructure/repository/authenticate");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_1 = require("@infrastructure/repository/user");
const _1 = require(".");
const exception_1 = require("@usecase/exception");
const exception_2 = require("@domain/exception");
const testData_1 = require("./testData");
const class_transformer_1 = require("@nestjs/class-transformer");
const user_2 = require("@domain/entity/user");
const api_result_1 = require("@usecase/dto/api-result");
describe('Signup Usecase Testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    beforeAll(async () => {
        usecase = new _1.default(new user_1.UserRepository(), new authenticate_1.AuthenticateRepository(), new transaction_1.default());
        connection = await (0, typeorm_1.createConnection)();
    });
    afterAll(async () => {
        connection.close();
    });
    describe('Normal case', () => {
        describe('Can signup with valid email and password', () => {
            beforeAll(async () => {
                input = { email: 'test@mail.com', password: 'TestPassword@123' };
                jest
                    .spyOn(authenticate_1.AuthenticateRepository.prototype, 'isEmailBeingUsed')
                    .mockResolvedValue(false);
                jest
                    .spyOn(authenticate_1.AuthenticateRepository.prototype, 'getJWT')
                    .mockReturnValue(testData_1.testJWT);
                jest
                    .spyOn(user_1.UserRepository.prototype, 'save')
                    .mockResolvedValue((0, class_transformer_1.plainToClass)(user_2.UserEntity, testData_1.userEntity));
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
        describe('Not provide email', () => {
            beforeAll(async () => {
                input = { email: '', password: 'TestPassword@123' };
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
        describe('Not provide password', () => {
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
        describe('Not provide email and password', () => {
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
        describe('Provide email that has invalid format', () => {
            beforeAll(async () => {
                input = { email: 'test', password: '123456' };
                try {
                    await usecase.execute(input);
                }
                catch (e) {
                    error = e;
                }
            });
            it('"Invalid email format" error message will be returned', () => {
                expect(error.message).toEqual('Invalid email format');
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_2.DomainErrorCode.BAD_REQUEST);
            });
            it('Error detail code is INVALID_EMAIL_FORMAT', () => {
                expect(error.info.detailCode).toEqual(exception_2.DomainErrorDetailCode.INVALID_EMAIL_FORMAT);
            });
        });
        describe('Provide existing email', () => {
            beforeAll(async () => {
                input = { email: 'test@mail.com', password: 'TestPassword@123' };
                jest
                    .spyOn(authenticate_1.AuthenticateRepository.prototype, 'isEmailBeingUsed')
                    .mockResolvedValue(true);
                try {
                    await usecase.execute(input);
                }
                catch (e) {
                    error = e;
                }
            });
            it('"Email is being used" error message will be returned', () => {
                expect(error.message).toEqual('Email is being used');
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.UsecaseErrorCode.BAD_REQUEST);
            });
            it('Error detail code is EMAIL_IS_BEING_USED', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.EMAIL_IS_BEING_USED);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map