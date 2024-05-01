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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFeedPostDto = exports.UserFeedPostCommentDto = exports.UserFeedPostLikeDto = void 0;
const class_transformer_1 = require("@nestjs/class-transformer");
const base_1 = require("./base");
class UserDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDto.prototype, "userName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserDto.prototype, "avatarURL", void 0);
class UserFeedPostLikeDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserFeedPostLikeDto.prototype, "id", void 0);
exports.UserFeedPostLikeDto = UserFeedPostLikeDto;
class UserFeedPostCommentDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserFeedPostCommentDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", UserDto)
], UserFeedPostCommentDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserFeedPostCommentDto.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], UserFeedPostCommentDto.prototype, "createdAt", void 0);
exports.UserFeedPostCommentDto = UserFeedPostCommentDto;
class UserFeedPostDto extends base_1.default {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserFeedPostDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", UserDto)
], UserFeedPostDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserFeedPostDto.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], UserFeedPostDto.prototype, "tags", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], UserFeedPostDto.prototype, "images", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], UserFeedPostDto.prototype, "likes", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], UserFeedPostDto.prototype, "comments", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], UserFeedPostDto.prototype, "createdAt", void 0);
exports.UserFeedPostDto = UserFeedPostDto;
//# sourceMappingURL=user-feed-post-dto.js.map