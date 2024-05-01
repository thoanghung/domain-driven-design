import { IAuthenticateRepository } from '@domain/repository/authenticate';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { Usecase, UsecaseInput, UsecaseOutput } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
export declare class UpdatePasswordUsecaseInput extends UsecaseInput {
    currentPassword: string;
    newPassword: string;
}
export declare class UpdatePasswordUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
}
export default class UpdatePasswordUsecase extends Usecase<UpdatePasswordUsecaseInput, UpdatePasswordUsecaseOutput> {
    private readonly authenRepository;
    private readonly userRepository;
    private readonly transactionManager;
    constructor(authenRepository: IAuthenticateRepository, userRepository: IUserRepository, transactionManager: ITransactionManager);
    execute(input: UpdatePasswordUsecaseInput, userId: number): Promise<UpdatePasswordUsecaseOutput>;
}
