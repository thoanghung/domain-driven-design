/// <reference types="multer" />
import CommentPostUsecase, { CommentPostUsecaseInput, CommentPostUsecaseOutput } from '@usecase/post/comment';
import CreatePostUsecase, { CreatePostUsecaseInput, CreatePostUsecaseOutput } from '@usecase/post/create';
import DeletePostUsecase, { DeletePostUsecaseOutput } from '@usecase/post/delete';
import DeletePostCommentUsecase, { DeletePostCommentUsecaseOutput } from '@usecase/post/delete-comment';
import LikePostUsecase, { LikePostUsecaseOutput } from '@usecase/post/like';
import UnlikePostUsecase, { UnlikePostUsecaseOutput } from '@usecase/post/unlike';
import UpdatePostUsecase, { UpdatePostUsecaseInput, UpdatePostUsecaseOutput } from '@usecase/post/update';
import UpdatePostCommentUsecase, { UpdatePostCommentUsecaseOutput } from '@usecase/post/update-comment';
import PostDetailView from '@view/post-detail-view';
declare class UpdatePostCommentApiBodyParams {
    content: string;
}
export declare class PostController {
    private readonly createPostUsecase;
    private readonly updatePostUsecase;
    private readonly deletePostUsecase;
    private readonly likePostUsecase;
    private readonly unlikePostUsecase;
    private readonly commentPostUsecase;
    private readonly updatePostCommentUsecase;
    private readonly deletePostCommentUsecase;
    private readonly postDetailView;
    constructor(createPostUsecase: CreatePostUsecase, updatePostUsecase: UpdatePostUsecase, deletePostUsecase: DeletePostUsecase, likePostUsecase: LikePostUsecase, unlikePostUsecase: UnlikePostUsecase, commentPostUsecase: CommentPostUsecase, updatePostCommentUsecase: UpdatePostCommentUsecase, deletePostCommentUsecase: DeletePostCommentUsecase, postDetailView: PostDetailView);
    create(images: Array<Express.Multer.File>, payload: CreatePostUsecaseInput, request: {
        user: {
            userId: number;
        };
    }): Promise<CreatePostUsecaseOutput>;
    update(payload: UpdatePostUsecaseInput, request: {
        user: {
            userId: number;
        };
    }): Promise<UpdatePostUsecaseOutput>;
    delete(postId: string, request: {
        user: {
            userId: number;
        };
    }): Promise<DeletePostUsecaseOutput>;
    like(postId: string, request: {
        user: {
            userId: number;
        };
    }): Promise<LikePostUsecaseOutput>;
    unlike(postId: string, request: {
        user: {
            userId: number;
        };
    }): Promise<UnlikePostUsecaseOutput>;
    comment(postId: string, payload: CommentPostUsecaseInput, request: {
        user: {
            userId: number;
        };
    }): Promise<CommentPostUsecaseOutput>;
    updateComment(postId: string, commentId: string, payload: UpdatePostCommentApiBodyParams, request: {
        user: {
            userId: number;
        };
    }): Promise<UpdatePostCommentUsecaseOutput>;
    deleteComment(postId: string, commentId: string, request: {
        user: {
            userId: number;
        };
    }): Promise<DeletePostCommentUsecaseOutput>;
    detail(id: string): Promise<{
        data: import("../../../view/dto/post-detail-dto").PostDetailDto;
    }>;
}
export {};
