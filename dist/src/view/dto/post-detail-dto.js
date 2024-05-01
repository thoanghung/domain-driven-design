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
exports.PostDetailDto = void 0;
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
class LikeDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], LikeDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => UserDto),
    __metadata("design:type", UserDto)
], LikeDto.prototype, "user", void 0);
class CommentDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CommentDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CommentDto.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => UserDto),
    __metadata("design:type", UserDto)
], CommentDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], CommentDto.prototype, "createdAt", void 0);
class PostDetailDto extends base_1.default {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PostDetailDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostDetailDto.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PostDetailDto.prototype, "tags", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PostDetailDto.prototype, "images", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => UserDto),
    __metadata("design:type", UserDto)
], PostDetailDto.prototype, "user", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => LikeDto),
    __metadata("design:type", Array)
], PostDetailDto.prototype, "likes", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => CommentDto),
    __metadata("design:type", Array)
], PostDetailDto.prototype, "comments", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PostDetailDto.prototype, "createdAt", void 0);
exports.PostDetailDto = PostDetailDto;
//# sourceMappingURL=post-detail-dto.js.map