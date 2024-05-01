"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileDto = void 0;
const class_transformer_1 = require("@nestjs/class-transformer");
const user_detail_1 = require("@infrastructure/rdb/entity/user-detail");
const user_profile_dto_1 = require("../../dto/user-profile-dto");
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
//# sourceMappingURL=index.js.map