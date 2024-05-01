import { UserFeedPostDto } from '@view/dto/user-feed-post-dto';
import { UserProfileDto } from '@view/dto/user-profile-dto';
import BaseViewFactory from '../base';
export declare class CreateUserProfileDtoParams {
    email: string;
    userName: string;
    userDetail: {
        avatarURL: string;
        nickName: string;
        gender: string;
    };
}
export declare class CreateUserFeedPostDtoParams {
    id: number;
    content: string;
    createdAt: Date;
    user: {
        id: number;
        userName: string;
        userDetail: {
            avatarURL: string;
        };
    };
    images: {
        list: string[];
    };
    tags: {
        list: string[];
    };
    likes: {
        id: number;
    }[];
    comments: {
        id: number;
        content: string;
        createdAt: Date;
        user: {
            id: number;
            userName: string;
            userDetail: {
                avatarURL: string;
            };
        };
    }[];
}
export default class UserViewFactory extends BaseViewFactory {
    createUserProfileDto(params: CreateUserProfileDtoParams): UserProfileDto;
    createUserFeedPostDto(params: CreateUserFeedPostDtoParams): UserFeedPostDto;
    createUserFeedPostDtoList(params: CreateUserFeedPostDtoParams[]): UserFeedPostDto[];
}
