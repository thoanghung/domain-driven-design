"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const _1 = require(".");
const exception_1 = require("@view/exception");
const post_view_repository_1 = require("@infrastructure/view-repository/post-view-repository");
const user_view_repository_1 = require("@infrastructure/view-repository/user-view-repository");
const testData_1 = require("./testData");
describe('UserPostsView Testing', () => {
    let view;
    let result;
    let connection;
    beforeAll(async () => {
        view = new _1.default(new post_view_repository_1.default(), new user_view_repository_1.default());
        connection = await (0, typeorm_1.createConnection)();
    });
    afterAll(async () => {
        await connection.close();
    });
    describe('getUserPosts Testing', () => {
        describe('Abnormal case', () => {
            let error;
            describe('Pass a non-exist user id', () => {
                beforeAll(async () => {
                    jest
                        .spyOn(user_view_repository_1.default.prototype, 'getUserProfileById')
                        .mockResolvedValue(null);
                    try {
                        await view.getUserPosts(1);
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
            describe('Pass id of the user that does not have any posts', () => {
                beforeAll(async () => {
                    jest
                        .spyOn(user_view_repository_1.default.prototype, 'getUserProfileById')
                        .mockResolvedValue(testData_1.userProfileDto);
                    jest
                        .spyOn(post_view_repository_1.default.prototype, 'getUserPosts')
                        .mockResolvedValue([]);
                    result = await view.getUserPosts(1);
                });
                it('Result is as expected', () => {
                    expect(result).toEqual({
                        data: [],
                    });
                });
            });
            describe('Pass id of the user that does not have posts', () => {
                beforeAll(async () => {
                    jest
                        .spyOn(user_view_repository_1.default.prototype, 'getUserProfileById')
                        .mockResolvedValue(testData_1.userProfileDto);
                    jest
                        .spyOn(post_view_repository_1.default.prototype, 'getUserPosts')
                        .mockResolvedValue(testData_1.userPostsDto);
                    result = await view.getUserPosts(1);
                });
                it('Result is as expected', () => {
                    expect(result).toEqual({
                        data: testData_1.userPostsDto,
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map