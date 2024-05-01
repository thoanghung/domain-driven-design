import { PostDetailDto } from '@view/dto/post-detail-dto';
import { UserPostDto } from '@view/dto/user-post-dto';
import BaseViewFactory from '../base';
export interface CreatePostDetailDtoParams {
    id: number;
    createdAt: Date;
    content: string;
    tags: {
        list: string[];
    };
    images: {
        list: string[];
    };
    likes: {
        id: number;
        user: {
            id: number;
            userName: string;
        };
    }[];
    comments: {
        id: number;
        content: string;
        createdAt: Date;
        user: {
            id: number;
            userName: string;
        };
    }[];
    user: {
        id: number;
        userName: string;
    };
}
export interface CreateUserPostDtoParams {
    id: number;
    images: {
        list: string[];
    };
    likes: {
        id: number;
    }[];
    comments: {
        id: number;
    }[];
    user: {
        id: number;
    };
}
export default class PostViewFactory extends BaseViewFactory {
    createPostDetailDto(params: CreatePostDetailDtoParams): PostDetailDto;
    createUserPostDto(params: CreateUserPostDtoParams): UserPostDto;
    createUserPosts(params: CreateUserPostDtoParams[]): UserPostDto[];
}
