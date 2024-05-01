import BaseDto from './base';
declare class UserDto {
    id: number;
    userName: string;
    avatarURL: string;
}
export declare class UserFeedPostLikeDto {
    id: number;
}
export declare class UserFeedPostCommentDto {
    id: number;
    user: UserDto;
    content: string;
    createdAt: Date;
}
export declare class UserFeedPostDto extends BaseDto {
    id: number;
    user: UserDto;
    content: string;
    tags: string[];
    images: string[];
    likes: UserFeedPostLikeDto[];
    comments: UserFeedPostCommentDto[];
    createdAt: Date;
}
export {};
