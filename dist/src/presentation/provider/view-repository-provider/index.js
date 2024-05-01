"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostViewRepositoryProvider = exports.UserViewRepositoryProvider = void 0;
const post_view_repository_1 = require("@view/view-repository/post-view-repository");
const user_view_repository_1 = require("@view/view-repository/user-view-repository");
const post_view_repository_2 = require("@infrastructure/view-repository/post-view-repository");
const user_view_repository_2 = require("@infrastructure/view-repository/user-view-repository");
exports.UserViewRepositoryProvider = {
    provide: user_view_repository_1.default,
    useClass: user_view_repository_2.default,
};
exports.PostViewRepositoryProvider = {
    provide: post_view_repository_1.default,
    useClass: post_view_repository_2.default,
};
//# sourceMappingURL=index.js.map