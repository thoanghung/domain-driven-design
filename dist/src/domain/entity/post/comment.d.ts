import { BaseEntity } from '../base';
export declare class CommentEntity extends BaseEntity {
    id?: number;
    content: string;
    userId: number;
    postId: number;
    isCreatedBy(userId: number): boolean;
    isCommentOfPost(postId: number): boolean;
    updateContent(content: string): void;
}
