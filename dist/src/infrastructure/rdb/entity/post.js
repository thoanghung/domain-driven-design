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
const typeorm_1 = require("typeorm");
const base_1 = require("./base");
const comment_1 = require("./comment");
const like_1 = require("./like");
const user_1 = require("./user");
let Post = class Post extends base_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'json',
    }),
    __metadata("design:type", Object)
], Post.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'json',
    }),
    __metadata("design:type", Object)
], Post.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_1.default, (user) => user.posts),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_1.default)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => like_1.default, (like) => like.post),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => comment_1.default, (comment) => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
Post = __decorate([
    (0, typeorm_1.Entity)()
], Post);
exports.default = Post;
//# sourceMappingURL=post.js.map