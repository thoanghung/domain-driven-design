import { IImageRepository } from '@domain/repository/image';
import { IPostRepository } from '@domain/repository/post';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import ApiResultDto from '@usecase/dto/api-result';
import { Usecase, UsecaseInput, UsecaseOutput } from '../../base';
export declare class CreatePostUsecaseInput extends UsecaseInput {
    content?: string;
    tags?: string[];
    images: FixType;
}
export declare class CreatedPostDto {
    id: number;
    images: string[];
    tags: string[];
    content: string;
    createdAt: Date;
    constructor({ id, images, tags, content, createdAt, }: {
        id: number;
        images: string[];
        tags: string[];
        content: string;
        createdAt: Date;
    });
}
export declare class CreatePostUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
    post: CreatedPostDto;
}
export default class CreatePostUsecase extends Usecase<CreatePostUsecaseInput, CreatePostUsecaseOutput> {
    private readonly userRepository;
    private readonly imageRepository;
    private readonly postRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, imageRepository: IImageRepository, postRepository: IPostRepository, transactionManager: ITransactionManager);
    execute(input: CreatePostUsecaseInput, userId: number): Promise<CreatePostUsecaseOutput>;
}
