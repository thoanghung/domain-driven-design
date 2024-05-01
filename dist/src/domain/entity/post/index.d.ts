import { BaseEntity } from '../base';
import { CommentEntity } from './comment';
import { LikeEntity } from './like';
export declare class PostEntity extends BaseEntity {
    id?: number;
    likes: LikeEntity[];
    comments: CommentEntity[];
    tags: string[];
    content: string;
    images: string[];
    userId: number;
    createdAt?: Date;
    updateImages(imageUrls: string[]): void;
    updateContent(newContent: string): void;
    updateTags(newTags: string[]): void;
    isCreatedBy(userId: number): boolean;
}
