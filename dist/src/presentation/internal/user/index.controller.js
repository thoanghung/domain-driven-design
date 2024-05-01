"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = require("@constants/http-status");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const follow_1 = require("@usecase/user/follow");
const unfollow_1 = require("@usecase/user/unfollow");
const update_password_1 = require("@usecase/user/update-password");
const update_profile_1 = require("@usecase/user/update-profile");
const user_profile_dto_1 = require("@view/dto/user-profile-dto");
const user_posts_view_1 = require("@view/user-posts-view");
const user_profile_view_1 = require("@view/user-profile-view");
const file_1 = require("@utils/file");
const user_feed_view_1 = require("@view/user-feed-view");
let UserController = class UserController {
    constructor(updatePasswordUsecase, updateUserProfileUsecase, followUserUsecase, unfollowUserUsecase, userProfileView, userPostsView, userFeedView) {
        this.updatePasswordUsecase = updatePasswordUsecase;
        this.updateUserProfileUsecase = updateUserProfileUsecase;
        this.followUserUsecase = followUserUsecase;
        this.unfollowUserUsecase = unfollowUserUsecase;
        this.userProfileView = userProfileView;
        this.userPostsView = userPostsView;
        this.userFeedView = userFeedView;
    }
    profile(request) {
        return this.userProfileView.getUserProfile(request.user.userId);
    }
    updateProfile(avatar, payload, request) {
        return this.updateUserProfileUsecase.execute(Object.assign(Object.assign({}, payload), { avatar }), request.user.userId);
    }
    updatePassword(payload, request) {
        return this.updatePasswordUsecase.execute(payload, request.user.userId);
    }
    follow(userId, request) {
        return this.followUserUsecase.execute({ destinationUserId: parseInt(userId) }, request.user.userId);
    }
    unfollow(userId, request) {
        return this.unfollowUserUsecase.execute({ destinationUserId: parseInt(userId) }, request.user.userId);
    }
    posts(userId) {
        return this.userPostsView.getUserPosts(parseInt(userId));
    }
    feed(page, request) {
        return this.userFeedView.getUserFeed(request.user.userId, parseInt(page));
    }
};
__decorate([
    (0, common_1.Get)('/profile'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get users profile',
        description: 'Get users profile',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Get user profile API response',
        type: user_profile_dto_1.UserProfileDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "profile", null);
__decorate([
    (0, common_1.Put)('/update-profile'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update users profile',
        description: 'Update users profile',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Update user profile data payload',
        type: update_profile_1.UpdateUserProfileUsecaseInput,
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Update user profile API response',
        type: update_profile_1.UpdateUserProfileUsecaseOutput,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        limits: {
            fileSize: 5000000,
        },
        fileFilter: file_1.uploadImageFilter,
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_1.UpdateUserProfileUsecaseInput, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('/update-password'),
    (0, common_1.HttpCode)(http_status_1.HTTP_STATUS.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update password API',
        description: 'Update password API',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Update password data payload',
        type: update_password_1.UpdatePasswordUsecaseInput,
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Update password API response',
        type: update_password_1.UpdatePasswordUsecaseOutput,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_1.UpdatePasswordUsecaseInput, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('/follow/:userId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Follow user API',
        description: 'Follow user API',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Query params',
        type: Number,
        name: 'userId',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Follow user API Response',
        type: follow_1.FollowUserUsecaseOutput,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "follow", null);
__decorate([
    (0, common_1.Delete)('/unfollow/:userId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Unfollow user API',
        description: 'Unfollow user API',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Query params',
        type: Number,
        name: 'userId',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Unfollow user API Response',
        type: unfollow_1.UnfollowUserUsecaseOutput,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "unfollow", null);
__decorate([
    (0, common_1.Get)('/:userId/posts'),
    (0, swagger_1.ApiOperation)({
        description: 'Get user posts API',
        summary: 'Get user posts API',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Query params',
        type: Number,
        name: 'userId',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Get user posts API response',
        type: user_posts_view_1.UserPostsViewOutput,
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "posts", null);
__decorate([
    (0, common_1.Get)('/feed'),
    (0, swagger_1.ApiOperation)({
        description: 'Get user feed API',
        summary: 'Get user feed API',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Get user feed API response',
        type: user_feed_view_1.UserFeedViewOutput,
    }),
    (0, swagger_1.ApiQuery)({
        description: 'Get user feed API Query params',
        name: 'page',
        type: Number,
    }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "feed", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('internal/user'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('internal/user'),
    __metadata("design:paramtypes", [update_password_1.default,
        update_profile_1.default,
        follow_1.default,
        unfollow_1.default,
        user_profile_view_1.default,
        user_posts_view_1.default,
        user_feed_view_1.default])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=index.controller.js.map