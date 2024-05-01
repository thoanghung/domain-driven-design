import { IFollowRepository } from '@domain/repository/follow';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { Usecase, UsecaseInput, UsecaseOutput } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
export declare class FollowUserUsecaseInput extends UsecaseInput {
    destinationUserId: number;
}
export declare class FollowUserUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
}
export default class FollowUserUsecase extends Usecase<FollowUserUsecaseInput, FollowUserUsecaseOutput> {
    private readonly userRepository;
    private readonly followRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, followRepository: IFollowRepository, transactionManager: ITransactionManager);
    execute(input: FollowUserUsecaseInput, userId: number): Promise<FollowUserUsecaseOutput>;
}
