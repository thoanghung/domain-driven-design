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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFeedViewOutput = void 0;
const common_1 = require("@nestjs/common");
const base_1 = require("@view/base");
const exception_1 = require("@view/exception");
const user_view_repository_1 = require("@view/view-repository/user-view-repository");
class UserFeedViewOutput {
}
exports.UserFeedViewOutput = UserFeedViewOutput;
let UserFeedView = class UserFeedView extends base_1.default {
    constructor(userViewRepository) {
        super();
        this.userViewRepository = userViewRepository;
    }
    async getUserFeed(userId, page) {
        const userProfile = await this.userViewRepository.getUserProfileById(userId);
        if (!userProfile) {
            throw new exception_1.ViewError({
                code: exception_1.ViewErrorCode.NOT_FOUND,
                message: 'User does not exist',
                info: {
                    detailCode: exception_1.ViewErrorDetailCode.USER_NOT_EXIST,
                },
            });
        }
        const feed = await this.userViewRepository.getUserFeed(userId, {
            page,
        });
        return { data: feed };
    }
};
UserFeedView = __decorate([
    __param(0, (0, common_1.Inject)(user_view_repository_1.default)),
    __metadata("design:paramtypes", [user_view_repository_1.default])
], UserFeedView);
exports.default = UserFeedView;
//# sourceMappingURL=index.js.map