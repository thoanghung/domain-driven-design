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
exports.UpdatePasswordUsecaseOutput = exports.UpdatePasswordUsecaseInput = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const authenticate_1 = require("@domain/repository/authenticate");
const transaction_1 = require("@domain/repository/transaction");
const user_1 = require("@domain/repository/user");
const base_1 = require("@usecase/base");
const api_result_1 = require("@usecase/dto/api-result");
const exception_1 = require("@usecase/exception");
class UpdatePasswordUsecaseInput extends base_1.UsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current password (encrypted)',
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], UpdatePasswordUsecaseInput.prototype, "currentPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New password (encrypted)',
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], UpdatePasswordUsecaseInput.prototype, "newPassword", void 0);
exports.UpdatePasswordUsecaseInput = UpdatePasswordUsecaseInput;
class UpdatePasswordUsecaseOutput extends base_1.UsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'API result',
        type: api_result_1.default,
        required: true,
    }),
    __metadata("design:type", api_result_1.default)
], UpdatePasswordUsecaseOutput.prototype, "result", void 0);
exports.UpdatePasswordUsecaseOutput = UpdatePasswordUsecaseOutput;
let UpdatePasswordUsecase = class UpdatePasswordUsecase extends base_1.Usecase {
    constructor(authenRepository, userRepository, transactionManager) {
        super();
        this.authenRepository = authenRepository;
        this.userRepository = userRepository;
        this.transactionManager = transactionManager;
    }
    async execute(input, userId) {
        const userEntity = await this.userRepository.getById(null, userId);
        let result;
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
        try {
            result = await this.authenRepository.validatePassword(userEntity.email.toString(), input.currentPassword);
        }
        catch (error) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
            });
        }
        if (!result) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                message: 'Current password does not match',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.CURRENT_PASS_NOT_MATCH,
                },
            });
        }
        userEntity.updatePassword(input.newPassword);
        try {
            await this.transactionManager.transaction(async (transaction) => {
                await this.userRepository.update(transaction, userEntity);
            });
        }
        catch (error) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            });
        }
        const output = new UpdatePasswordUsecaseOutput();
        output.result = api_result_1.default.ok();
        return output;
    }
};
UpdatePasswordUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(authenticate_1.IAuthenticateRepository)),
    __param(1, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(2, (0, common_1.Inject)(transaction_1.default)),
    __metadata("design:paramtypes", [authenticate_1.IAuthenticateRepository,
        user_1.IUserRepository,
        transaction_1.default])
], UpdatePasswordUsecase);
exports.default = UpdatePasswordUsecase;
//# sourceMappingURL=index.js.map