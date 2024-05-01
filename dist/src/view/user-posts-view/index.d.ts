import { UserPostDto } from '@view/dto/user-post-dto';
import IPostViewRepository from '@view/view-repository/post-view-repository';
import IUserViewRepository from '@view/view-repository/user-view-repository';
import BaseView from '../base';
export declare class UserPostsViewOutput {
    data: UserPostDto[];
}
export default class UserPostsView extends BaseView {
    private readonly postViewRepository;
    private readonly userViewRepository;
    constructor(postViewRepository: IPostViewRepository, userViewRepository: IUserViewRepository);
    getUserPosts(userId: number): Promise<UserPostsViewOutput>;
}
