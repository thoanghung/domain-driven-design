import { IPostRepository } from '@domain/repository/post';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { ILikeRepository } from '@domain/repository/like';
import { Usecase, UsecaseInput, UsecaseOutput } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
export declare class LikePostUsecaseInput extends UsecaseInput {
    postId: number;
}
export declare class LikePostUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
}
export default class LikePostUsecase extends Usecase<LikePostUsecaseInput, LikePostUsecaseOutput> {
    private readonly userRepository;
    private readonly postRepository;
    private readonly likeRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, postRepository: IPostRepository, likeRepository: ILikeRepository, transactionManager: ITransactionManager);
    execute(input: LikePostUsecaseInput, userId: number): Promise<LikePostUsecaseOutput>;
}
