import { IPostRepository } from '@domain/repository/post';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { UsecaseInput, UsecaseOutput, Usecase } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
export declare class UpdatePostUsecaseInput extends UsecaseInput {
    id: number;
    content?: string;
    tags?: string[];
}
export declare class UpdatedPostDto {
    id: number;
    content: string;
    tags: string[];
    constructor({ id, content, tags, }: {
        id: number;
        content: string;
        tags: string[];
    });
}
export declare class UpdatePostUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
    post: UpdatedPostDto;
}
export default class UpdatePostUsecase extends Usecase<UsecaseInput, UsecaseOutput> {
    private readonly userRepository;
    private readonly postRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, postRepository: IPostRepository, transactionManager: ITransactionManager);
    execute(input: UpdatePostUsecaseInput, userId: number): Promise<UpdatePostUsecaseOutput>;
}
