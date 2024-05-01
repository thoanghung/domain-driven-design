import { UserProfileDto } from '@view/dto/user-profile-dto';
declare const userProfileDto: UserProfileDto;
declare const userFeedPosts: {
    id: number;
    createdAt: Date;
    content: string;
    tags: string[];
    images: string[];
    user: {
        id: number;
        userName: string;
        avatarURL: string;
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
            avatarURL: string;
        };
    }[];
}[];
export { userFeedPosts, userProfileDto };
