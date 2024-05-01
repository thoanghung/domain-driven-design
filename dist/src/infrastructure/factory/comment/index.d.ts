import { CommentEntity } from '@domain/entity/post/comment';
import Comment from '@infrastructure/rdb/entity/comment';
import { BaseFactory } from '../base';
interface ReconstructCommentParams {
    content: string;
    userId: number;
    postId: number;
}
export declare class CommentFactory extends BaseFactory {
    createCommentEntity(comment: Comment): CommentEntity;
    reconstruct(params: ReconstructCommentParams): CommentEntity;
}
export {};
