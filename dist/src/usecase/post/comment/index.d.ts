import { IPostRepository } from '@domain/repository/post';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { Usecase, UsecaseInput, UsecaseOutput } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
import { ICommentRepository } from '@domain/repository/comment';
export declare class CommentPostUsecaseInput extends UsecaseInput {
    content: string;
}
export declare class CommentPostUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
}
export default class CommentPostUsecase extends Usecase<CommentPostUsecaseInput, CommentPostUsecaseOutput> {
    private readonly userRepository;
    private readonly postRepository;
    private readonly commentRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, postRepository: IPostRepository, commentRepository: ICommentRepository, transactionManager: ITransactionManager);
    execute(input: CommentPostUsecaseInput, { postId, userId }: {
        postId: number;
        userId: number;
    }): Promise<CommentPostUsecaseOutput>;
}
