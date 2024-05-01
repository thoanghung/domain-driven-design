import IPostViewRepository from '@view/view-repository/post-view-repository';
import IUserViewRepository from '@view/view-repository/user-view-repository';
import PostViewRepository from '@infrastructure/view-repository/post-view-repository';
import UserViewRepository from '@infrastructure/view-repository/user-view-repository';
export declare const UserViewRepositoryProvider: {
    provide: typeof IUserViewRepository;
    useClass: typeof UserViewRepository;
};
export declare const PostViewRepositoryProvider: {
    provide: typeof IPostViewRepository;
    useClass: typeof PostViewRepository;
};
