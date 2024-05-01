import { UserProfileDto } from '@view/dto/user-profile-dto';
import IUserViewRepository from '@view/view-repository/user-view-repository';
import { UserFeedPostDto } from '@view/dto/user-feed-post-dto';
export interface GetUserFeedOption {
    limit?: number;
    page: number;
    orderBy?: OrderBy;
}
export default class UserViewRepository implements IUserViewRepository {
    getUserProfileById(id: number): Promise<UserProfileDto | null>;
    getUserFeed(userId: number, options: GetUserFeedOption): Promise<UserFeedPostDto[]>;
    private getBaseQueryForGettingUserProfile;
    private getBaseQueryForGettingFollowingUser;
    private getBaseQueryForGettingUserFeed;
}
