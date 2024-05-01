import BaseDto from './base';
declare class UserDto {
    id: number;
    userName: string;
}
declare class LikeDto {
    id: number;
    user: UserDto;
}
declare class CommentDto {
    id: number;
    content: string;
    user: UserDto;
    createdAt: Date;
}
export declare class PostDetailDto extends BaseDto {
    id: number;
    content: string;
    tags: string[];
    images: string[];
    user: UserDto;
    likes: LikeDto[];
    comments: CommentDto[];
    createdAt: Date;
}
export {};
