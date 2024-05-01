import { IAuthenticateRepository } from '@domain/repository/authenticate';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import ApiResultDto from '@usecase/dto/api-result';
import { Usecase, UsecaseOutput } from '../../base';
export declare class SignupUsecaseInput {
    email: string;
    password: string;
}
declare class SignupUsecaseOutputData {
    jwt: string;
    constructor(params: {
        jwt: string;
    });
}
export declare class SignupUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
    data: SignupUsecaseOutputData;
}
export default class SignupUsecase extends Usecase<SignupUsecaseInput, SignupUsecaseOutput> {
    private readonly userRepository;
    private readonly authenRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, authenRepository: IAuthenticateRepository, transactionManager: ITransactionManager);
    execute(input: SignupUsecaseInput): Promise<SignupUsecaseOutput>;
}
export {};
