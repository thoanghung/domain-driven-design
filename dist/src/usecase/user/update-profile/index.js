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
exports.UpdateUserProfileUsecaseOutput = exports.UpdateUserProfileUsecaseInput = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_detail_1 = require("@domain/entity/user/user-detail");
const image_1 = require("@domain/repository/image");
const transaction_1 = require("@domain/repository/transaction");
const user_1 = require("@domain/repository/user");
const base_1 = require("@usecase/base");
const api_result_1 = require("@usecase/dto/api-result");
const exception_1 = require("@usecase/exception");
const exception_2 = require("@infrastructure/exception");
class UpdateUserProfileUsecaseInput extends base_1.UsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User nick name',
        required: false,
        type: String,
    }),
    __metadata("design:type", String)
], UpdateUserProfileUsecaseInput.prototype, "nickName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New avatar',
        required: false,
        type: String,
        format: 'binary',
    }),
    __metadata("design:type", Object)
], UpdateUserProfileUsecaseInput.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User gender',
        required: false,
        enum: user_detail_1.UserDetailGender,
    }),
    __metadata("design:type", String)
], UpdateUserProfileUsecaseInput.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User name',
        required: false,
        type: String,
    }),
    __metadata("design:type", String)
], UpdateUserProfileUsecaseInput.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email',
        required: false,
        type: String,
    }),
    __metadata("design:type", String)
], UpdateUserProfileUsecaseInput.prototype, "email", void 0);
exports.UpdateUserProfileUsecaseInput = UpdateUserProfileUsecaseInput;
class UpdateUserProfileUsecaseOutput extends base_1.UsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'API result',
        type: api_result_1.default,
        required: true,
    }),
    __metadata("design:type", api_result_1.default)
], UpdateUserProfileUsecaseOutput.prototype, "result", void 0);
exports.UpdateUserProfileUsecaseOutput = UpdateUserProfileUsecaseOutput;
let UpdateUserProfileUsecase = class UpdateUserProfileUsecase extends base_1.Usecase {
    constructor(userRepository, imageRepository, transactionManager) {
        super();
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.transactionManager = transactionManager;
    }
    async execute(input, userId) {
        var _a;
        const userEntity = await this.userRepository.getById(null, userId);
        if (!userEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'User does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.USER_NOT_EXIST,
                    userId,
                },
            });
        }
        let imageInfoPayload = null;
        let avatarGetURL = '';
        let imageKey = '';
        if (input.avatar && Object.keys(input.avatar).length > 0) {
            imageInfoPayload = {
                name: input.avatar.originalname,
                type: input.avatar.mimetype,
                data: input.avatar.buffer,
                userId,
            };
            imageKey = this.imageRepository.generateKey(image_1.DomainImageType.USER_AVATAR, imageInfoPayload);
            avatarGetURL = this.imageRepository.generateGetURL(imageKey);
        }
        const updateUserDetailParams = this.makeUpdateUserDetailParams(input, avatarGetURL);
        const oldAvatarURL = ((_a = userEntity.detail) === null || _a === void 0 ? void 0 : _a.avatarURL) || '';
        if (updateUserDetailParams) {
            userEntity.updateDetail(updateUserDetailParams);
        }
        if (input.email) {
            userEntity.updateEmail(input.email);
        }
        if (input.userName) {
            userEntity.updateUserName(input.userName);
        }
        try {
            await this.transactionManager.transaction(async (transaction) => {
                await this.userRepository.update(transaction, userEntity);
            });
            if (imageInfoPayload) {
                await this.imageRepository.uploadImageToImageServer(imageKey, imageInfoPayload);
            }
        }
        catch (error) {
            if (error instanceof exception_2.InfrastructureError) {
                if (error.code === exception_2.InfrastructureErrorCode.INTERNAL_SERVER_ERROR &&
                    error.info.errorCode ===
                        exception_2.InfrastructureErrorDetailCode.UPLOAD_IMAGE_TO_IMAGE_SERVER_FAILED) {
                    userEntity.updateDetail({ avatarURL: oldAvatarURL });
                    await this.transactionManager.transaction(async (transaction) => {
                        await this.userRepository.update(transaction, userEntity);
                    });
                }
            }
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                info: error.stack,
            });
        }
        const output = new UpdateUserProfileUsecaseOutput();
        output.result = api_result_1.default.ok();
        return output;
    }
    makeUpdateUserDetailParams(input, avatarGetURL) {
        const updateUserDetailParams = {};
        if (avatarGetURL.length > 0) {
            updateUserDetailParams.avatarURL = avatarGetURL;
        }
        if (input.nickName !== null) {
            updateUserDetailParams.nickName = input.nickName;
        }
        if (input.gender) {
            updateUserDetailParams.gender = input.gender;
        }
        return updateUserDetailParams;
    }
};
UpdateUserProfileUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(image_1.IImageRepository)),
    __param(2, (0, common_1.Inject)(transaction_1.default)),
    __metadata("design:paramtypes", [user_1.IUserRepository,
        image_1.IImageRepository,
        transaction_1.default])
], UpdateUserProfileUsecase);
exports.default = UpdateUserProfileUsecase;
//# sourceMappingURL=index.js.map