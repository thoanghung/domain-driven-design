import { ICommentRepository } from '@domain/repository/comment';
import { IPostRepository } from '@domain/repository/post';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { Usecase, UsecaseInput, UsecaseOutput } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
export declare class DeletePostCommentUsecaseInput extends UsecaseInput {
    postId: number;
    commentId: number;
}
export declare class DeletePostCommentUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
}
export default class DeletePostCommentUsecase extends Usecase<DeletePostCommentUsecaseInput, DeletePostCommentUsecaseOutput> {
    private readonly userRepository;
    private readonly postRepository;
    private readonly commentRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, postRepository: IPostRepository, commentRepository: ICommentRepository, transactionManager: ITransactionManager);
    execute(input: DeletePostCommentUsecaseInput, userId: number): Promise<DeletePostCommentUsecaseOutput>;
}
