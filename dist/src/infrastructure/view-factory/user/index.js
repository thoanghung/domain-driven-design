"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserFeedPostDtoParams = exports.CreateUserProfileDtoParams = void 0;
const user_profile_dto_1 = require("@view/dto/user-profile-dto");
const base_1 = require("../base");
class CreateUserProfileDtoParams {
}
exports.CreateUserProfileDtoParams = CreateUserProfileDtoParams;
class CreateUserFeedPostDtoParams {
}
exports.CreateUserFeedPostDtoParams = CreateUserFeedPostDtoParams;
class UserViewFactory extends base_1.default {
    createUserProfileDto(params) {
        var _a, _b, _c;
        return this.createEntity(user_profile_dto_1.UserProfileDto, {
            email: params.email,
            userName: params.userName,
            detail: {
                avatarURL: ((_a = params.userDetail) === null || _a === void 0 ? void 0 : _a.avatarURL) || '',
                nickName: ((_b = params.userDetail) === null || _b === void 0 ? void 0 : _b.nickName) || '',
                gender: ((_c = params.userDetail) === null || _c === void 0 ? void 0 : _c.gender) || '',
            },
        });
    }
    createUserFeedPostDto(params) {
        return {
            id: params.id,
            user: {
                id: params.user.id,
                userName: params.user.userName,
                avatarURL: params.user.userDetail.avatarURL,
            },
            createdAt: params.createdAt,
            content: params.content,
            tags: params.tags.list,
            images: params.images.list,
            likes: params.likes,
            comments: params.comments.map((comment) => ({
                id: comment.id,
                content: comment.content,
                createdAt: comment.createdAt,
                user: {
                    id: comment.user.id,
                    userName: comment.user.userName,
                    avatarURL: comment.user.userDetail.avatarURL,
                },
            })),
        };
    }
    createUserFeedPostDtoList(params) {
        return params.map((param) => this.createUserFeedPostDto(param));
    }
}
exports.default = UserViewFactory;
//# sourceMappingURL=index.js.map