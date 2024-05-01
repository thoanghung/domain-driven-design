import { IFollowRepository } from '@domain/repository/follow';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { Usecase, UsecaseInput, UsecaseOutput } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
export declare class UnfollowUserUsecaseInput extends UsecaseInput {
    destinationUserId: number;
}
export declare class UnfollowUserUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
}
export default class UnfollowUserUsecase extends Usecase<UnfollowUserUsecaseInput, UnfollowUserUsecaseOutput> {
    private readonly userRepository;
    private readonly followRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, followRepository: IFollowRepository, transactionManager: ITransactionManager);
    execute(input: UnfollowUserUsecaseInput, sourceUserId: number): Promise<UnfollowUserUsecaseOutput>;
}
