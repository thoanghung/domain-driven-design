"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const _1 = require(".");
const user_view_repository_1 = require("@infrastructure/view-repository/user-view-repository");
const testData_1 = require("./testData");
const exception_1 = require("@view/exception");
describe('UserFeedView Testing', () => {
    let view;
    let result;
    let connection;
    let userId;
    let page;
    beforeAll(async () => {
        view = new _1.default(new user_view_repository_1.default());
        connection = await (0, typeorm_1.createConnection)();
    });
    afterAll(async () => {
        await connection.close();
    });
    describe('getUserFeed Testing', () => {
        describe('Abnormal case', () => {
            let error;
            describe('Pass a non-exist user id', () => {
                beforeAll(async () => {
                    userId = 1;
                    page = 1;
                    jest
                        .spyOn(user_view_repository_1.default.prototype, 'getUserProfileById')
                        .mockResolvedValue(null);
                    try {
                        await view.getUserFeed(userId, page);
                    }
                    catch (err) {
                        error = err;
                    }
                });
                it('Error code is NOT_FOUND', () => {
                    expect(error.code).toEqual(exception_1.ViewErrorCode.NOT_FOUND);
                });
                it('Error message is "User does not exist"', () => {
                    expect(error.message).toEqual('User does not exist');
                });
                it('Error info detailCode is USER_NOT_EXIST', () => {
                    expect(error.info.detailCode).toEqual(exception_1.ViewErrorDetailCode.USER_NOT_EXIST);
                });
            });
        });
        describe('Normal case', () => {
            beforeAll(async () => {
                userId = 1;
                page = 1;
                jest
                    .spyOn(user_view_repository_1.default.prototype, 'getUserProfileById')
                    .mockResolvedValue(testData_1.userProfileDto);
                jest
                    .spyOn(user_view_repository_1.default.prototype, 'getUserFeed')
                    .mockResolvedValue(testData_1.userFeedPosts);
                result = await view.getUserFeed(userId, page);
            });
            it('Result is as expected', () => {
                expect(result).toEqual({ data: testData_1.userFeedPosts });
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map