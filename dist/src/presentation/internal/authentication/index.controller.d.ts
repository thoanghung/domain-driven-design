import SigninUsecase, { SigninUsecaseInput, SigninUsecaseOutput } from '@usecase/authentication/signin';
import SignupUsecase, { SignupUsecaseInput, SignupUsecaseOutput } from '@usecase/authentication/signup';
export declare class AuthenticationController {
    private readonly signinUsecase;
    private readonly signupUsecase;
    constructor(signinUsecase: SigninUsecase, signupUsecase: SignupUsecase);
    signIn(input: SigninUsecaseInput): Promise<SigninUsecaseOutput>;
    signUp(input: SignupUsecaseInput): Promise<SignupUsecaseOutput>;
}
