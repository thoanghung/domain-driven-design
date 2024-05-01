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
exports.PostEntity = void 0;
const class_transformer_1 = require("@nestjs/class-transformer");
const base_1 = require("../base");
const comment_1 = require("./comment");
const like_1 = require("./like");
class PostEntity extends base_1.BaseEntity {
    updateImages(imageUrls) {
        this.images = imageUrls;
    }
    updateContent(newContent) {
        this.content = newContent;
    }
    updateTags(newTags) {
        this.tags = newTags;
    }
    isCreatedBy(userId) {
        return this.userId === userId;
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PostEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => like_1.LikeEntity),
    __metadata("design:type", Array)
], PostEntity.prototype, "likes", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => comment_1.CommentEntity),
    __metadata("design:type", Array)
], PostEntity.prototype, "comments", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PostEntity.prototype, "tags", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PostEntity.prototype, "content", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], PostEntity.prototype, "images", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], PostEntity.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], PostEntity.prototype, "createdAt", void 0);
exports.PostEntity = PostEntity;
//# sourceMappingURL=index.js.map