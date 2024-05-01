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
exports.DeletePostCommentUsecaseOutput = exports.DeletePostCommentUsecaseInput = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comment_1 = require("@domain/repository/comment");
const post_1 = require("@domain/repository/post");
const transaction_1 = require("@domain/repository/transaction");
const user_1 = require("@domain/repository/user");
const base_1 = require("@usecase/base");
const api_result_1 = require("@usecase/dto/api-result");
const exception_1 = require("@usecase/exception");
class DeletePostCommentUsecaseInput extends base_1.UsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post id',
        type: Number,
        required: true,
    }),
    __metadata("design:type", Number)
], DeletePostCommentUsecaseInput.prototype, "postId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Comment id',
        type: Number,
        required: true,
    }),
    __metadata("design:type", Number)
], DeletePostCommentUsecaseInput.prototype, "commentId", void 0);
exports.DeletePostCommentUsecaseInput = DeletePostCommentUsecaseInput;
class DeletePostCommentUsecaseOutput extends base_1.UsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Api Result',
        type: api_result_1.default,
    }),
    __metadata("design:type", api_result_1.default)
], DeletePostCommentUsecaseOutput.prototype, "result", void 0);
exports.DeletePostCommentUsecaseOutput = DeletePostCommentUsecaseOutput;
let DeletePostCommentUsecase = class DeletePostCommentUsecase extends base_1.Usecase {
    constructor(userRepository, postRepository, commentRepository, transactionManager) {
        super();
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.transactionManager = transactionManager;
    }
    async execute(input, userId) {
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
        const postEntity = await this.postRepository.getById(null, input.postId);
        if (!postEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'Post does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.POST_NOT_EXIST,
                    postId: input.postId,
                },
            });
        }
        const commentEntity = await this.commentRepository.getById(null, input.commentId);
        if (!commentEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'Comment does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.COMMENT_NOT_EXIST,
                    commentId: input.commentId,
                },
            });
        }
        if (!postEntity.isCreatedBy(userId) && !commentEntity.isCreatedBy(userId)) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                message: 'Unauthorized to delete comment',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.UNAUTHORIZED_TO_DELETE_COMMENT,
                },
            });
        }
        if (!commentEntity.isCommentOfPost(input.postId)) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                message: 'Is not comment of post',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.IS_NOT_COMMENT_OF_POST,
                },
            });
        }
        try {
            await this.transactionManager.transaction(async (transaction) => {
                await this.commentRepository.deleteById(transaction, input.commentId);
            });
        }
        catch (err) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            });
        }
        const output = new DeletePostCommentUsecaseOutput();
        output.result = api_result_1.default.ok();
        return output;
    }
};
DeletePostCommentUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(post_1.IPostRepository)),
    __param(2, (0, common_1.Inject)(comment_1.ICommentRepository)),
    __param(3, (0, common_1.Inject)(transaction_1.default)),
    __metadata("design:paramtypes", [user_1.IUserRepository,
        post_1.IPostRepository,
        comment_1.ICommentRepository,
        transaction_1.default])
], DeletePostCommentUsecase);
exports.default = DeletePostCommentUsecase;
//# sourceMappingURL=index.js.map