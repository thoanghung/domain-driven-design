"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_view_repository_1 = require("@infrastructure/view-repository/post-view-repository");
const _1 = require(".");
const testData_1 = require("./testData");
describe('PostDetail View Testing', () => {
    let view;
    let result;
    beforeAll(async () => {
        view = new _1.default(new post_view_repository_1.default());
    });
    describe('getPostDetail Testing', () => {
        let postId;
        describe('Pass an existing post id', () => {
            beforeAll(async () => {
                postId = 1;
                jest
                    .spyOn(post_view_repository_1.default.prototype, 'getPostDetail')
                    .mockResolvedValue(testData_1.postDetailDto);
                result = await view.getPostDetail(postId);
            });
            it('PostDetailDto data will be returned', () => {
                expect(result).toEqual({ data: testData_1.postDetailDto });
            });
        });
        describe('Pass a non-existing post id', () => {
            beforeAll(async () => {
                postId = 100;
                jest
                    .spyOn(post_view_repository_1.default.prototype, 'getPostDetail')
                    .mockResolvedValue(null);
                result = await view.getPostDetail(postId);
            });
            it('null will be returned', () => {
                expect(result).toEqual({ data: null });
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map