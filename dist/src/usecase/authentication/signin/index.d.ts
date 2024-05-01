import { Usecase } from '../../base';
import { IUserRepository } from '@domain/repository/user';
import { IAuthenticateRepository } from '@domain/repository/authenticate';
import ApiResultDto from '@usecase/dto/api-result';
export declare class SigninUsecaseInput {
    email: string;
    password: string;
}
declare class SigninUsecaseOutputData {
    jwt: string;
    constructor(params: {
        jwt: string;
    });
}
export declare class SigninUsecaseOutput {
    result: ApiResultDto;
    data: SigninUsecaseOutputData;
}
export default class SigninUsecase extends Usecase<SigninUsecaseInput, SigninUsecaseOutput> {
    private readonly userRepository;
    private readonly authenticateRepository;
    constructor(userRepository: IUserRepository, authenticateRepository: IAuthenticateRepository);
    execute(input: SigninUsecaseInput): Promise<SigninUsecaseOutput>;
}
export {};
