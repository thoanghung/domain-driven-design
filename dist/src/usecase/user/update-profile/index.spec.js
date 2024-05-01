"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("@nestjs/class-transformer");
const transaction_1 = require("@infrastructure/repository/transaction");
const user_1 = require("@infrastructure/repository/user");
const image_1 = require("@infrastructure/repository/image");
const _1 = require(".");
const exception_1 = require("@usecase/exception");
const api_result_1 = require("@usecase/dto/api-result");
const user_2 = require("@domain/entity/user");
const user_detail_1 = require("@domain/entity/user/user-detail");
const testImage = require("./testData/test_image.jpeg");
describe('UpdateProfile Usecase testing', () => {
    let input;
    let output;
    let usecase;
    let connection;
    beforeAll(async () => {
        usecase = new _1.default(new user_1.UserRepository(), new image_1.default(), new transaction_1.default());
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
                    email: 'test@mail.com',
                };
                jest.spyOn(user_1.UserRepository.prototype, 'getById').mockResolvedValue(null);
                try {
                    await usecase.execute(input, 1);
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
            it('Error info errorCode is USER_NOT_EXIST', () => {
                expect(error.info.detailCode).toEqual(exception_1.UsecaseErrorDetailCode.USER_NOT_EXIST);
            });
            it('Error info userId is 1', () => {
                expect(error.info.userId).toEqual(1);
            });
        });
    });
    describe('Normal case', () => {
        describe('Can update user and user detail data', () => {
            beforeAll(async () => {
                input = {
                    email: 'test@mail.com',
                    avatar: testImage,
                    nickName: 'testNickName',
                };
                jest.spyOn(user_1.UserRepository.prototype, 'getById').mockResolvedValue((0, class_transformer_1.plainToClass)(user_2.UserEntity, {
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
                    .spyOn(image_1.default.prototype, 'generateKey')
                    .mockReturnValue('imageKey');
                jest
                    .spyOn(image_1.default.prototype, 'generateGetURL')
                    .mockReturnValue('getURL');
                jest
                    .spyOn(image_1.default.prototype, 'uploadImageToImageServer')
                    .mockResolvedValue(null);
                jest.spyOn(user_1.UserRepository.prototype, 'update').mockResolvedValue(null);
                output = await usecase.execute(input, 1);
            });
            it('Output API result is OK', () => {
                expect(output.result.code).toEqual(api_result_1.ApiResultCode.OK);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map