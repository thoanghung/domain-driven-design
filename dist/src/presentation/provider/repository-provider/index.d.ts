import { IAuthenticateRepository } from '@domain/repository/authenticate';
import { IUserRepository } from '@domain/repository/user';
import { IPostRepository } from '@domain/repository/post';
import { IImageRepository } from '@domain/repository/image';
import { ILikeRepository } from '@domain/repository/like';
import { ICommentRepository } from '@domain/repository/comment';
import ITransactionManager from '@domain/repository/transaction';
import { UserRepository } from '@infrastructure/repository/user';
import { PostRepository } from '@infrastructure/repository/post';
import TransactionManager from '@infrastructure/repository/transaction';
import ImageRepository from '@infrastructure/repository/image';
import { AuthenticateRepository } from '@infrastructure/repository/authenticate';
import { IFollowRepository } from '@domain/repository/follow';
import { FollowRepository } from '@infrastructure/repository/follow';
import { LikeRepository } from '@infrastructure/repository/like';
import { CommentRepository } from '@infrastructure/repository/comment';
export declare const UserRepositoryProvider: {
    provide: typeof IUserRepository;
    useClass: typeof UserRepository;
};
export declare const AuthenticateRepositoryProvider: {
    provide: typeof IAuthenticateRepository;
    useClass: typeof AuthenticateRepository;
};
export declare const TransactionManagerProvider: {
    provide: typeof ITransactionManager;
    useClass: typeof TransactionManager;
};
export declare const ImageRepositoryProvider: {
    provide: typeof IImageRepository;
    useClass: typeof ImageRepository;
};
export declare const PostRepositoryProvider: {
    provide: typeof IPostRepository;
    useClass: typeof PostRepository;
};
export declare const FollowRepositoryProvider: {
    provide: typeof IFollowRepository;
    useClass: typeof FollowRepository;
};
export declare const LikeRepositoryProvider: {
    provide: typeof ILikeRepository;
    useClass: typeof LikeRepository;
};
export declare const CommentRepositoryProvider: {
    provide: typeof ICommentRepository;
    useClass: typeof CommentRepository;
};
