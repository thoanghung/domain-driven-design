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
exports.FollowUserUsecaseOutput = exports.FollowUserUsecaseInput = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const follow_1 = require("@domain/repository/follow");
const transaction_1 = require("@domain/repository/transaction");
const user_1 = require("@domain/repository/user");
const base_1 = require("@usecase/base");
const api_result_1 = require("@usecase/dto/api-result");
const exception_1 = require("@usecase/exception");
const follow_2 = require("@infrastructure/factory/follow");
const followFactory = new follow_2.FollowFactory();
class FollowUserUsecaseInput extends base_1.UsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Destination user id',
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], FollowUserUsecaseInput.prototype, "destinationUserId", void 0);
exports.FollowUserUsecaseInput = FollowUserUsecaseInput;
class FollowUserUsecaseOutput extends base_1.UsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'API Result',
        type: api_result_1.default,
        required: true,
    }),
    __metadata("design:type", api_result_1.default)
], FollowUserUsecaseOutput.prototype, "result", void 0);
exports.FollowUserUsecaseOutput = FollowUserUsecaseOutput;
let FollowUserUsecase = class FollowUserUsecase extends base_1.Usecase {
    constructor(userRepository, followRepository, transactionManager) {
        super();
        this.userRepository = userRepository;
        this.followRepository = followRepository;
        this.transactionManager = transactionManager;
    }
    async execute(input, userId) {
        const [sourceUserEntity, destinationUserEntity] = await this.userRepository.getByIds(null, [
            userId,
            input.destinationUserId,
        ]);
        if (input.destinationUserId === userId) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                message: 'You can not follow yourself',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.CAN_NOT_FOLLOW_MYSELF,
                },
            });
        }
        if (!sourceUserEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'Source user does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.SOURCE_USER_NOT_EXIST,
                    userId,
                },
            });
        }
        if (!destinationUserEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'Destination user does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.DESTINATION_USER_NOT_EXIST,
                    userId: input.destinationUserId,
                },
            });
        }
        const followEntity = await this.followRepository.getByUserIds(null, userId, input.destinationUserId);
        if (followEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                message: 'You are following this user',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.HAVE_BEEN_FOLLOWING_USER,
                },
            });
        }
        const newFollowEntity = followFactory.reconstruct({
            sourceUserId: userId,
            destinationUserId: input.destinationUserId,
        });
        try {
            await this.transactionManager.transaction(async (transaction) => {
                await this.followRepository.save(transaction, newFollowEntity);
            });
        }
        catch (err) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
            });
        }
        const output = new FollowUserUsecaseOutput();
        output.result = api_result_1.default.ok();
        return output;
    }
};
FollowUserUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(follow_1.IFollowRepository)),
    __param(2, (0, common_1.Inject)(transaction_1.default)),
    __metadata("design:paramtypes", [user_1.IUserRepository,
        follow_1.IFollowRepository,
        transaction_1.default])
], FollowUserUsecase);
exports.default = FollowUserUsecase;
//# sourceMappingURL=index.js.map