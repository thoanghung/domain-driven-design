import BaseView from '@view/base';
import { UserFeedPostDto } from '@view/dto/user-feed-post-dto';
import IUserViewRepository from '@view/view-repository/user-view-repository';
export declare class UserFeedViewOutput {
    data: UserFeedPostDto[];
}
export default class UserFeedView extends BaseView {
    private readonly userViewRepository;
    constructor(userViewRepository: IUserViewRepository);
    getUserFeed(userId: number, page: number): Promise<UserFeedViewOutput>;
}
