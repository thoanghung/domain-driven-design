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
exports.Gender = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("./base");
const user_1 = require("./user");
exports.Gender = {
    Male: 'Male',
    Female: 'Female',
};
let UserDetail = class UserDetail extends base_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetail.prototype, "nickName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetail.prototype, "avatarURL", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: exports.Gender,
    }),
    __metadata("design:type", String)
], UserDetail.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], UserDetail.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => user_1.default, (user) => user.userDetail),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_1.default)
], UserDetail.prototype, "user", void 0);
UserDetail = __decorate([
    (0, typeorm_1.Entity)()
], UserDetail);
exports.default = UserDetail;
//# sourceMappingURL=user-detail.js.map