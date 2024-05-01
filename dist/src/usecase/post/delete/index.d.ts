import { ICommentRepository } from '@domain/repository/comment';
import { ILikeRepository } from '@domain/repository/like';
import { IPostRepository } from '@domain/repository/post';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { Usecase, UsecaseInput, UsecaseOutput } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
export declare class DeletePostUsecaseInput extends UsecaseInput {
    id: number;
}
export declare class DeletePostUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
}
export default class DeletePostUsecase extends Usecase<DeletePostUsecaseInput, DeletePostUsecaseOutput> {
    private readonly userRepository;
    private readonly postRepository;
    private readonly likeRepository;
    private readonly commentRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, postRepository: IPostRepository, likeRepository: ILikeRepository, commentRepository: ICommentRepository, transactionManager: ITransactionManager);
    execute(input: DeletePostUsecaseInput, userId: number): Promise<DeletePostUsecaseOutput>;
}
