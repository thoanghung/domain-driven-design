import { ILikeRepository } from '@domain/repository/like';
import { IPostRepository } from '@domain/repository/post';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { Usecase, UsecaseInput, UsecaseOutput } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
export declare class UnlikePostUsecaseInput extends UsecaseInput {
    postId: number;
}
export declare class UnlikePostUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
}
export default class UnlikePostUsecase extends Usecase<UnlikePostUsecaseInput, UnlikePostUsecaseOutput> {
    private readonly userRepository;
    private readonly postRepository;
    private readonly likeRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, postRepository: IPostRepository, likeRepository: ILikeRepository, transactionManager: ITransactionManager);
    execute(input: UnlikePostUsecaseInput, userId: number): Promise<UnlikePostUsecaseOutput>;
}
