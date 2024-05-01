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
exports.CommentPostUsecaseOutput = exports.CommentPostUsecaseInput = void 0;
const common_1 = require("@nestjs/common");
const post_1 = require("@domain/repository/post");
const transaction_1 = require("@domain/repository/transaction");
const user_1 = require("@domain/repository/user");
const base_1 = require("@usecase/base");
const exception_1 = require("@usecase/exception");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("@usecase/dto/api-result");
const comment_1 = require("@infrastructure/factory/comment");
const comment_2 = require("@domain/repository/comment");
class CommentPostUsecaseInput extends base_1.UsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Comment content',
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], CommentPostUsecaseInput.prototype, "content", void 0);
exports.CommentPostUsecaseInput = CommentPostUsecaseInput;
class CommentPostUsecaseOutput extends base_1.UsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Api Result',
        type: api_result_1.default,
    }),
    __metadata("design:type", api_result_1.default)
], CommentPostUsecaseOutput.prototype, "result", void 0);
exports.CommentPostUsecaseOutput = CommentPostUsecaseOutput;
const commentFactory = new comment_1.CommentFactory();
let CommentPostUsecase = class CommentPostUsecase extends base_1.Usecase {
    constructor(userRepository, postRepository, commentRepository, transactionManager) {
        super();
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.transactionManager = transactionManager;
    }
    async execute(input, { postId, userId }) {
        const userEntity = await this.userRepository.getById(null, userId);
        if (!userEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'User does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.USER_NOT_EXIST,
                },
            });
        }
        const postEntity = await this.postRepository.getById(null, postId);
        if (!postEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'Post does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.POST_NOT_EXIST,
                },
            });
        }
        if (!input.content.length) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                message: 'Content can not be empty',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.COMMENT_CONTENT_CAN_NOT_EMPTY,
                },
            });
        }
        const comment = commentFactory.reconstruct({
            postId,
            userId,
            content: input.content,
        });
        try {
            await this.transactionManager.transaction(async (transaction) => {
                await this.commentRepository.save(transaction, comment);
            });
        }
        catch (err) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            });
        }
        const output = new CommentPostUsecaseOutput();
        output.result = api_result_1.default.ok();
        return output;
    }
};
CommentPostUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(post_1.IPostRepository)),
    __param(2, (0, common_1.Inject)(comment_2.ICommentRepository)),
    __param(3, (0, common_1.Inject)(transaction_1.default)),
    __metadata("design:paramtypes", [user_1.IUserRepository,
        post_1.IPostRepository,
        comment_2.ICommentRepository,
        transaction_1.default])
], CommentPostUsecase);
exports.default = CommentPostUsecase;
//# sourceMappingURL=index.js.map