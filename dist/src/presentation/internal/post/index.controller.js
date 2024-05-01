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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const comment_1 = require("@usecase/post/comment");
const create_1 = require("@usecase/post/create");
const delete_1 = require("@usecase/post/delete");
const delete_comment_1 = require("@usecase/post/delete-comment");
const like_1 = require("@usecase/post/like");
const unlike_1 = require("@usecase/post/unlike");
const update_1 = require("@usecase/post/update");
const update_comment_1 = require("@usecase/post/update-comment");
const file_1 = require("@utils/file");
const post_detail_view_1 = require("@view/post-detail-view");
class UpdatePostCommentApiBodyParams {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Comment content',
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], UpdatePostCommentApiBodyParams.prototype, "content", void 0);
let PostController = class PostController {
    constructor(createPostUsecase, updatePostUsecase, deletePostUsecase, likePostUsecase, unlikePostUsecase, commentPostUsecase, updatePostCommentUsecase, deletePostCommentUsecase, postDetailView) {
        this.createPostUsecase = createPostUsecase;
        this.updatePostUsecase = updatePostUsecase;
        this.deletePostUsecase = deletePostUsecase;
        this.likePostUsecase = likePostUsecase;
        this.unlikePostUsecase = unlikePostUsecase;
        this.commentPostUsecase = commentPostUsecase;
        this.updatePostCommentUsecase = updatePostCommentUsecase;
        this.deletePostCommentUsecase = deletePostCommentUsecase;
        this.postDetailView = postDetailView;
    }
    create(images, payload, request) {
        return this.createPostUsecase.execute(Object.assign(Object.assign({}, payload), { images }), request.user.userId);
    }
    update(payload, request) {
        return this.updatePostUsecase.execute(payload, request.user.userId);
    }
    delete(postId, request) {
        return this.deletePostUsecase.execute({ id: parseInt(postId) }, request.user.userId);
    }
    like(postId, request) {
        return this.likePostUsecase.execute({ postId: parseInt(postId) }, request.user.userId);
    }
    unlike(postId, request) {
        return this.unlikePostUsecase.execute({ postId: parseInt(postId) }, request.user.userId);
    }
    comment(postId, payload, request) {
        return this.commentPostUsecase.execute(payload, {
            postId: parseInt(postId),
            userId: request.user.userId,
        });
    }
    updateComment(postId, commentId, payload, request) {
        return this.updatePostCommentUsecase.execute({
            postId: parseInt(postId),
            commentId: parseInt(commentId),
            content: payload.content,
        }, request.user.userId);
    }
    deleteComment(postId, commentId, request) {
        return this.deletePostCommentUsecase.execute({ postId: parseInt(postId), commentId: parseInt(commentId) }, request.user.userId);
    }
    detail(id) {
        return this.postDetailView.getPostDetail(parseInt(id));
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create post',
        description: 'Create post',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Create post data payload',
        type: create_1.CreatePostUsecaseInput,
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Create post API response',
        type: create_1.CreatePostUsecaseOutput,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', null, {
        limits: {
            fileSize: 5000000,
        },
        fileFilter: file_1.uploadImageFilter,
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array,
        create_1.CreatePostUsecaseInput, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/update'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update post',
        description: 'Update post',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Update post payload',
        type: update_1.UpdatePostUsecaseInput,
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Update post API response',
        type: update_1.UpdatePostUsecaseOutput,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_1.UpdatePostUsecaseInput, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:postId/delete/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete post by id',
        description: 'Delete post by id',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Delete post API Query param',
        type: Number,
        name: 'postId',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Delete post API response',
        type: delete_1.DeletePostUsecaseOutput,
    }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('/:postId/like/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Like post',
        description: 'Like post',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Like post API Query Param',
        type: Number,
        name: 'postId',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Like post API response',
        type: like_1.LikePostUsecaseOutput,
    }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "like", null);
__decorate([
    (0, common_1.Delete)('/:postId/unlike/'),
    (0, swagger_1.ApiOperation)({
        summary: 'Unlike post API',
        description: 'Unlike post API',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Unlike post API Query Param',
        type: Number,
        name: 'postId',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Unlike post API response',
        type: unlike_1.UnlikePostUsecaseOutput,
    }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "unlike", null);
__decorate([
    (0, common_1.Post)('/:postId/comment'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create posts comment API',
        description: 'Create posts comment API',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Create posts comment Query param',
        type: Number,
        name: 'postId',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Create posts comment API body',
        type: comment_1.CommentPostUsecaseInput,
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Create posts comment API response',
        type: comment_1.CommentPostUsecaseOutput,
    }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comment_1.CommentPostUsecaseInput, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "comment", null);
__decorate([
    (0, common_1.Put)('/:postId/comment/:commentId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update posts comment API',
        description: 'Update posts comment API',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Post id',
        type: Number,
        name: 'postId',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Comment id',
        type: Number,
        name: 'commentId',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Comment content',
        type: UpdatePostCommentApiBodyParams,
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Update posts comment API Response',
        type: update_comment_1.UpdatePostCommentUsecaseOutput,
    }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, UpdatePostCommentApiBodyParams, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)('/:postId/comment/:commentId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete posts comment API',
        description: 'Delete posts comment API',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Post id',
        type: Number,
        name: 'postId',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Comment id',
        type: Number,
        name: 'commentId',
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Delete posts comment API Response',
        type: delete_comment_1.DeletePostCommentUsecaseOutput,
    }),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Param)('commentId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Get)(':id/detail'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get post detail by posts id',
        description: 'Get post detail by posts id',
    }),
    (0, swagger_1.ApiParam)({
        description: 'Get post detail API Query Param',
        type: Number,
        name: 'id',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "detail", null);
PostController = __decorate([
    (0, swagger_1.ApiTags)('internal/posts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('internal/post'),
    __metadata("design:paramtypes", [create_1.default,
        update_1.default,
        delete_1.default,
        like_1.default,
        unlike_1.default,
        comment_1.default,
        update_comment_1.default,
        delete_comment_1.default,
        post_detail_view_1.default])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=index.controller.js.map