/// <reference types="multer" />
import FollowUserUsecase, { FollowUserUsecaseOutput } from '@usecase/user/follow';
import UnfollowUserUsecase, { UnfollowUserUsecaseOutput } from '@usecase/user/unfollow';
import UpdatePasswordUsecase, { UpdatePasswordUsecaseInput, UpdatePasswordUsecaseOutput } from '@usecase/user/update-password';
import UpdateUserProfileUsecase, { UpdateUserProfileUsecaseInput, UpdateUserProfileUsecaseOutput } from '@usecase/user/update-profile';
import { UserProfileDto } from '@view/dto/user-profile-dto';
import UserPostsView, { UserPostsViewOutput } from '@view/user-posts-view';
import UserProfileView from '@view/user-profile-view';
import UserFeedView, { UserFeedViewOutput } from '@view/user-feed-view';
export declare class UserController {
    private readonly updatePasswordUsecase;
    private readonly updateUserProfileUsecase;
    private readonly followUserUsecase;
    private readonly unfollowUserUsecase;
    private readonly userProfileView;
    private readonly userPostsView;
    private readonly userFeedView;
    constructor(updatePasswordUsecase: UpdatePasswordUsecase, updateUserProfileUsecase: UpdateUserProfileUsecase, followUserUsecase: FollowUserUsecase, unfollowUserUsecase: UnfollowUserUsecase, userProfileView: UserProfileView, userPostsView: UserPostsView, userFeedView: UserFeedView);
    profile(request: {
        user: {
            userId: number;
        };
    }): Promise<UserProfileDto>;
    updateProfile(avatar: Express.Multer.File, payload: UpdateUserProfileUsecaseInput, request: {
        user: {
            userId: number;
        };
    }): Promise<UpdateUserProfileUsecaseOutput>;
    updatePassword(payload: UpdatePasswordUsecaseInput, request: {
        user: {
            userId: number;
        };
    }): Promise<UpdatePasswordUsecaseOutput>;
    follow(userId: string, request: {
        user: {
            userId: number;
        };
    }): Promise<FollowUserUsecaseOutput>;
    unfollow(userId: string, request: {
        user: {
            userId: number;
        };
    }): Promise<UnfollowUserUsecaseOutput>;
    posts(userId: string): Promise<UserPostsViewOutput>;
    feed(page: string, request: {
        user: {
            userId: number;
        };
    }): Promise<UserFeedViewOutput>;
}
