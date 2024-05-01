"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const user_view_repository_1 = require("@infrastructure/view-repository/user-view-repository");
const testData_1 = require("./testData");
describe('UserProfileView Testing', () => {
    let view;
    let result;
    beforeAll(async () => {
        view = new _1.default(new user_view_repository_1.default());
    });
    describe('getUserProfile Testing', () => {
        describe('Pass an existing user id', () => {
            beforeAll(async () => {
                jest
                    .spyOn(user_view_repository_1.default.prototype, 'getUserProfileById')
                    .mockResolvedValue(testData_1.userProfileDto);
                result = await view.getUserProfile(1);
            });
            it('UserProfileDto will be returned', () => {
                expect(result).toEqual(testData_1.userProfileDto);
            });
        });
        describe('Pass a not existing user id', () => {
            beforeAll(async () => {
                jest
                    .spyOn(user_view_repository_1.default.prototype, 'getUserProfileById')
                    .mockReturnValue(null);
                result = await view.getUserProfile(2);
            });
            it('null will be returned', () => {
                expect(result).toEqual(null);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map