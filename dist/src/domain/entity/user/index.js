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
exports.UserEntity = void 0;
const exception_1 = require("@domain/exception");
const class_transformer_1 = require("@nestjs/class-transformer");
const email_vo_1 = require("../../value-object/email-vo");
const password_vo_1 = require("../../value-object/password-vo");
const base_1 = require("../base");
const user_detail_1 = require("./user-detail");
class UserEntity extends base_1.BaseEntity {
    constructor() {
        super();
    }
    updateEmail(newEmail) {
        const newEmailVO = new email_vo_1.EmailVO(newEmail);
        this.email = newEmailVO;
    }
    updatePassword(newPassword) {
        const newPasswordVO = new password_vo_1.PasswordVO(newPassword);
        this.password = newPasswordVO;
    }
    updateUserName(newUserName) {
        if (newUserName.length === 0) {
            throw new exception_1.DomainError({
                code: exception_1.DomainErrorCode.BAD_REQUEST,
                message: 'User name can not be empty',
                info: {
                    detailCode: exception_1.DomainErrorDetailCode.USER_NAME_CAN_NOT_BE_EMPTY,
                },
            });
        }
        this.userName = newUserName;
    }
    updateDetail(params) {
        if (!this.detail) {
            this.detail = new user_detail_1.UserDetailEntity();
        }
        if (params.avatarURL) {
            this.detail.avatarURL = params.avatarURL;
        }
        if (params.gender) {
            this.detail.gender = params.gender;
        }
        if (params.nickName !== null) {
            this.detail.nickName = params.nickName;
        }
    }
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => email_vo_1.EmailVO),
    __metadata("design:type", email_vo_1.EmailVO)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserEntity.prototype, "userName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => password_vo_1.PasswordVO),
    __metadata("design:type", password_vo_1.PasswordVO)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => user_detail_1.UserDetailEntity),
    __metadata("design:type", user_detail_1.UserDetailEntity)
], UserEntity.prototype, "detail", void 0);
exports.UserEntity = UserEntity;
//# sourceMappingURL=index.js.map