"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPostsDto = exports.userProfileDto = void 0;
const class_transformer_1 = require("@nestjs/class-transformer");
const user_profile_dto_1 = require("@view/dto/user-profile-dto");
const user_post_dto_1 = require("@view/dto/user-post-dto");
const user_detail_1 = require("@infrastructure/rdb/entity/user-detail");
const userProfileDto = (0, class_transformer_1.plainToClass)(user_profile_dto_1.UserProfileDto, {
    email: 'test@mail.com',
    userName: 'userName',
    detail: {
        gender: user_detail_1.Gender.Male,
        avatarURL: 'image/avatar.jpg',
        nickName: 'nick name',
    },
});
exports.userProfileDto = userProfileDto;
const userPostsDto = [
    (0, class_transformer_1.plainToClass)(user_post_dto_1.UserPostDto, {
        id: 1,
        likesCount: 0,
        commentsCount: 1,
        thumbnail: 'image-1-thumbnail',
    }),
    (0, class_transformer_1.plainToClass)(user_post_dto_1.UserPostDto, {
        id: 2,
        likesCount: 2,
        commentsCount: 1,
        thumbnail: 'image-12thumbnail',
    }),
];
exports.userPostsDto = userPostsDto;
//# sourceMappingURL=index.js.map