import { PostEntity } from '@domain/entity/post';
import { BaseFactory } from '../base';
import Post from '@infrastructure/rdb/entity/post';
interface CreatePostEntityParams {
    id: number;
    images: string[];
    tags: string[];
    content: string;
    likes: {
        id: number;
        postId: number;
        userId: number;
    }[];
    comments: {
        id: number;
        postId: number;
        userId: number;
        content: string;
    }[];
    userId: number;
    createdAt: Date;
}
export declare class PostFactory extends BaseFactory {
    createPostEntity(post: Post | null): PostEntity;
    reconstruct(post: Post): CreatePostEntityParams;
    createNewPostEntity(content: string, imageUrls: string[], tags: string[], userId: number): PostEntity;
}
export {};
