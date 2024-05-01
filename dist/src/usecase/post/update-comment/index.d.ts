import { ICommentRepository } from '@domain/repository/comment';
import { IPostRepository } from '@domain/repository/post';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { Usecase, UsecaseInput, UsecaseOutput } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
export declare class UpdatePostCommentUsecaseInput extends UsecaseInput {
    postId: number;
    commentId: number;
    content: string;
}
export declare class UpdatePostCommentUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
}
export default class UpdatePostCommentUsecase extends Usecase<UpdatePostCommentUsecaseInput, UpdatePostCommentUsecaseOutput> {
    private readonly userRepository;
    private readonly postRepository;
    private readonly commentRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, postRepository: IPostRepository, commentRepository: ICommentRepository, transactionManager: ITransactionManager);
    execute(input: UpdatePostCommentUsecaseInput, userId: number): Promise<UpdatePostCommentUsecaseOutput>;
}
