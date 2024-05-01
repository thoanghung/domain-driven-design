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
exports.UnfollowUserUsecaseOutput = exports.UnfollowUserUsecaseInput = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const follow_1 = require("@domain/repository/follow");
const transaction_1 = require("@domain/repository/transaction");
const user_1 = require("@domain/repository/user");
const base_1 = require("@usecase/base");
const api_result_1 = require("@usecase/dto/api-result");
const exception_1 = require("@usecase/exception");
class UnfollowUserUsecaseInput extends base_1.UsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unfollow user id',
        type: Number,
    }),
    __metadata("design:type", Number)
], UnfollowUserUsecaseInput.prototype, "destinationUserId", void 0);
exports.UnfollowUserUsecaseInput = UnfollowUserUsecaseInput;
class UnfollowUserUsecaseOutput extends base_1.UsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ApiResultDto',
        type: api_result_1.default,
    }),
    __metadata("design:type", api_result_1.default)
], UnfollowUserUsecaseOutput.prototype, "result", void 0);
exports.UnfollowUserUsecaseOutput = UnfollowUserUsecaseOutput;
let UnfollowUserUsecase = class UnfollowUserUsecase extends base_1.Usecase {
    constructor(userRepository, followRepository, transactionManager) {
        super();
        this.userRepository = userRepository;
        this.followRepository = followRepository;
        this.transactionManager = transactionManager;
    }
    async execute(input, sourceUserId) {
        const [sourceUserEntity, destinationUserEntity] = await this.userRepository.getByIds(null, [
            sourceUserId,
            input.destinationUserId,
        ]);
        if (!sourceUserEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'Source user does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.SOURCE_USER_NOT_EXIST,
                },
            });
        }
        if (!destinationUserEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'Destination user does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.DESTINATION_USER_NOT_EXIST,
                },
            });
        }
        const followEntity = await this.followRepository.getByUserIds(null, sourceUserId, input.destinationUserId);
        if (!followEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                message: 'You are not following this user',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.NOT_FOLLOWING_USER,
                },
            });
        }
        try {
            await this.transactionManager.transaction(async (transaction) => {
                await this.followRepository.deleteById(transaction, followEntity.id);
            });
        }
        catch (err) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
            });
        }
        const output = new UnfollowUserUsecaseOutput();
        output.result = api_result_1.default.ok();
        return output;
    }
};
UnfollowUserUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(follow_1.IFollowRepository)),
    __param(2, (0, common_1.Inject)(transaction_1.default)),
    __metadata("design:paramtypes", [user_1.IUserRepository,
        follow_1.IFollowRepository,
        transaction_1.default])
], UnfollowUserUsecase);
exports.default = UnfollowUserUsecase;
//# sourceMappingURL=index.js.map