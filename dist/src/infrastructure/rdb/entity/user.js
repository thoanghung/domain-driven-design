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
const post_1 = require("./post");
const user_detail_1 = require("./user-detail");
const like_1 = require("./like");
const comment_1 = require("./comment");
const notification_1 = require("./notification");
const follow_1 = require("./follow");
let User = class User extends base_1.default {
};
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((_type) => user_detail_1.default, (userDetail) => userDetail.user),
    __metadata("design:type", user_detail_1.default)
], User.prototype, "userDetail", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => post_1.default, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => like_1.default, (like) => like.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => comment_1.default, (comment) => comment.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => notification_1.default, (notification) => notification.sourceUser),
    __metadata("design:type", Array)
], User.prototype, "sentNotifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => notification_1.default, (notification) => notification.owner),
    __metadata("design:type", Array)
], User.prototype, "ownNotifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => follow_1.default, (follow) => follow.sourceUser),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => follow_1.default, (follow) => follow.destinationUser),
    __metadata("design:type", Array)
], User.prototype, "followings", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.default = User;
//# sourceMappingURL=user.js.map