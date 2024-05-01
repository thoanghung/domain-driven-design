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
exports.UpdatePostUsecaseOutput = exports.UpdatedPostDto = exports.UpdatePostUsecaseInput = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const post_1 = require("@domain/repository/post");
const transaction_1 = require("@domain/repository/transaction");
const user_1 = require("@domain/repository/user");
const base_1 = require("@usecase/base");
const api_result_1 = require("@usecase/dto/api-result");
const exception_1 = require("@usecase/exception");
class UpdatePostUsecaseInput extends base_1.UsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post id',
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], UpdatePostUsecaseInput.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post new content',
        required: false,
        type: String,
    }),
    __metadata("design:type", String)
], UpdatePostUsecaseInput.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post new tags',
        required: false,
        type: [String],
    }),
    __metadata("design:type", Array)
], UpdatePostUsecaseInput.prototype, "tags", void 0);
exports.UpdatePostUsecaseInput = UpdatePostUsecaseInput;
class UpdatedPostDto {
    constructor({ id, content, tags, }) {
        this.id = id;
        this.content = content;
        this.tags = tags;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post id',
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], UpdatedPostDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post content',
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], UpdatedPostDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post tags',
        required: true,
        type: [String],
    }),
    __metadata("design:type", Array)
], UpdatedPostDto.prototype, "tags", void 0);
exports.UpdatedPostDto = UpdatedPostDto;
class UpdatePostUsecaseOutput extends base_1.UsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'API result',
        type: api_result_1.default,
        required: true,
    }),
    __metadata("design:type", api_result_1.default)
], UpdatePostUsecaseOutput.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Updated Post DTO',
        type: UpdatedPostDto,
        required: true,
    }),
    __metadata("design:type", UpdatedPostDto)
], UpdatePostUsecaseOutput.prototype, "post", void 0);
exports.UpdatePostUsecaseOutput = UpdatePostUsecaseOutput;
let UpdatePostUsecase = class UpdatePostUsecase extends base_1.Usecase {
    constructor(userRepository, postRepository, transactionManager) {
        super();
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.transactionManager = transactionManager;
    }
    async execute(input, userId) {
        const userEntity = await this.userRepository.getById(null, userId);
        const output = new UpdatePostUsecaseOutput();
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
        const postEntity = await this.postRepository.getById(null, input.id);
        if (!postEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'Post does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.POST_NOT_EXIST,
                    postId: input.id,
                },
            });
        }
        if (!postEntity.isCreatedBy(userId)) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                message: 'Unauthorized to update post',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.UNAUTHORIZED_TO_UPDATE_POST,
                    postId: input.id,
                    userId,
                },
            });
        }
        if (!input.content && !input.tags) {
            output.result = api_result_1.default.ok();
            output.post = new UpdatedPostDto({
                id: postEntity.id,
                content: postEntity.content,
                tags: postEntity.tags,
            });
            return output;
        }
        if (input.content) {
            postEntity.updateContent(input.content);
        }
        if (input.tags) {
            postEntity.updateTags(input.tags);
        }
        try {
            await this.transactionManager.transaction(async (transaction) => {
                await this.postRepository.update(transaction, postEntity);
            });
        }
        catch (error) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            });
        }
        output.result = api_result_1.default.ok();
        output.post = new UpdatedPostDto({
            id: postEntity.id,
            content: postEntity.content,
            tags: postEntity.tags,
        });
        return output;
    }
};
UpdatePostUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(post_1.IPostRepository)),
    __param(2, (0, common_1.Inject)(transaction_1.default)),
    __metadata("design:paramtypes", [user_1.IUserRepository,
        post_1.IPostRepository,
        transaction_1.default])
], UpdatePostUsecase);
exports.default = UpdatePostUsecase;
//# sourceMappingURL=index.js.map