"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalApiModule = void 0;
const common_1 = require("@nestjs/common");
const signin_1 = require("@usecase/authentication/signin");
const signup_1 = require("@usecase/authentication/signup");
const update_profile_1 = require("@usecase/user/update-profile");
const create_1 = require("@usecase/post/create");
const update_1 = require("@usecase/post/update");
const delete_1 = require("@usecase/post/delete");
const update_password_1 = require("@usecase/user/update-password");
const repository_provider_1 = require("@presentation/provider/repository-provider");
const view_repository_provider_1 = require("@presentation/provider/view-repository-provider");
const index_controller_1 = require("@presentation/internal/authentication/index.controller");
const index_controller_2 = require("@presentation/internal/notification/index.controller");
const index_controller_3 = require("@presentation/internal/post/index.controller");
const index_controller_4 = require("@presentation/internal/user/index.controller");
const auth_middleware_1 = require("@presentation/middleware/auth-middleware");
const user_profile_view_1 = require("@view/user-profile-view");
const post_detail_view_1 = require("@view/post-detail-view");
const follow_1 = require("@usecase/user/follow");
const unfollow_1 = require("@usecase/user/unfollow");
const like_1 = require("@usecase/post/like");
const unlike_1 = require("@usecase/post/unlike");
const comment_1 = require("@usecase/post/comment");
const delete_comment_1 = require("@usecase/post/delete-comment");
const update_comment_1 = require("@usecase/post/update-comment");
const user_posts_view_1 = require("@view/user-posts-view");
const user_feed_view_1 = require("@view/user-feed-view");
const RepositoryProviders = [
    repository_provider_1.AuthenticateRepositoryProvider,
    repository_provider_1.UserRepositoryProvider,
    repository_provider_1.TransactionManagerProvider,
    repository_provider_1.ImageRepositoryProvider,
    repository_provider_1.PostRepositoryProvider,
    repository_provider_1.FollowRepositoryProvider,
    repository_provider_1.LikeRepositoryProvider,
    repository_provider_1.CommentRepositoryProvider,
];
const ViewRepositoryProvider = [
    view_repository_provider_1.PostViewRepositoryProvider,
    view_repository_provider_1.UserViewRepositoryProvider,
];
let Repositories = class Repositories {
};
Repositories = __decorate([
    (0, common_1.Module)({
        providers: [...RepositoryProviders],
        exports: [...RepositoryProviders],
    })
], Repositories);
let ViewRepositories = class ViewRepositories {
};
ViewRepositories = __decorate([
    (0, common_1.Module)({
        providers: [...ViewRepositoryProvider],
        exports: [...ViewRepositoryProvider],
    })
], ViewRepositories);
const RequiredAuthenControllers = [
    index_controller_4.UserController,
    index_controller_3.PostController,
    index_controller_2.NotificationController,
];
let InternalApiModule = class InternalApiModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(...RequiredAuthenControllers);
    }
};
InternalApiModule = __decorate([
    (0, common_1.Module)({
        imports: [Repositories, ViewRepositories],
        providers: [
            signin_1.default,
            signup_1.default,
            update_password_1.default,
            update_profile_1.default,
            follow_1.default,
            unfollow_1.default,
            create_1.default,
            update_1.default,
            delete_1.default,
            like_1.default,
            unlike_1.default,
            comment_1.default,
            delete_comment_1.default,
            update_comment_1.default,
            user_profile_view_1.default,
            user_posts_view_1.default,
            user_feed_view_1.default,
            post_detail_view_1.default,
        ],
        controllers: [index_controller_1.AuthenticationController, ...RequiredAuthenControllers],
    })
], InternalApiModule);
exports.InternalApiModule = InternalApiModule;
//# sourceMappingURL=index.js.map