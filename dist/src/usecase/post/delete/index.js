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
exports.DeletePostUsecaseOutput = exports.DeletePostUsecaseInput = void 0;
const comment_1 = require("@domain/repository/comment");
const like_1 = require("@domain/repository/like");
const post_1 = require("@domain/repository/post");
const transaction_1 = require("@domain/repository/transaction");
const user_1 = require("@domain/repository/user");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("@usecase/base");
const api_result_1 = require("@usecase/dto/api-result");
const exception_1 = require("@usecase/exception");
class DeletePostUsecaseInput extends base_1.UsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post id',
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], DeletePostUsecaseInput.prototype, "id", void 0);
exports.DeletePostUsecaseInput = DeletePostUsecaseInput;
class DeletePostUsecaseOutput extends base_1.UsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'API result',
        type: api_result_1.default,
    }),
    __metadata("design:type", api_result_1.default)
], DeletePostUsecaseOutput.prototype, "result", void 0);
exports.DeletePostUsecaseOutput = DeletePostUsecaseOutput;
let DeletePostUsecase = class DeletePostUsecase extends base_1.Usecase {
    constructor(userRepository, postRepository, likeRepository, commentRepository, transactionManager) {
        super();
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.likeRepository = likeRepository;
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
        const postEntity = await this.postRepository.getById(null, input.id);
        if (!postEntity) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.NOT_FOUND,
                message: 'Post does not exist',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.POST_NOT_EXIST,
                    postId: input.id,
                    userId,
                },
            });
        }
        if (!postEntity.isCreatedBy(userId)) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                message: 'Unauthorized to delete post',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.UNAUTHORIZED_TO_DELETE_POST,
                    postId: input.id,
                    userId,
                },
            });
        }
        try {
            await this.transactionManager.transaction(async (transaction) => {
                const deletePostLikes = postEntity.likes.map((like) => this.likeRepository.deleteById(transaction, like.id));
                const deletePostComments = postEntity.comments.map((comment) => this.commentRepository.deleteById(transaction, comment.id));
                await Promise.all([...deletePostLikes, ...deletePostComments]);
                await this.postRepository.deleteById(transaction, postEntity.id);
            });
        }
        catch (err) {
            console.log(err);
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            });
        }
        const output = new DeletePostUsecaseOutput();
        output.result = api_result_1.default.ok();
        return output;
    }
};
DeletePostUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(post_1.IPostRepository)),
    __param(2, (0, common_1.Inject)(like_1.ILikeRepository)),
    __param(3, (0, common_1.Inject)(comment_1.ICommentRepository)),
    __param(4, (0, common_1.Inject)(transaction_1.default)),
    __metadata("design:paramtypes", [user_1.IUserRepository,
        post_1.IPostRepository,
        like_1.ILikeRepository,
        comment_1.ICommentRepository,
        transaction_1.default])
], DeletePostUsecase);
exports.default = DeletePostUsecase;
//# sourceMappingURL=index.js.map