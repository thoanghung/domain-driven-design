import { UserDetailGender } from '@domain/entity/user/user-detail';
import { IImageRepository } from '@domain/repository/image';
import ITransactionManager from '@domain/repository/transaction';
import { IUserRepository } from '@domain/repository/user';
import { Usecase, UsecaseInput, UsecaseOutput } from '@usecase/base';
import ApiResultDto from '@usecase/dto/api-result';
export declare class UpdateUserProfileUsecaseInput extends UsecaseInput {
    nickName?: string;
    avatar?: FixType;
    gender?: UserDetailGender;
    userName?: string;
    email?: string;
}
export declare class UpdateUserProfileUsecaseOutput extends UsecaseOutput {
    result: ApiResultDto;
}
export default class UpdateUserProfileUsecase extends Usecase<UpdateUserProfileUsecaseInput, UpdateUserProfileUsecaseOutput> {
    private readonly userRepository;
    private readonly imageRepository;
    private readonly transactionManager;
    constructor(userRepository: IUserRepository, imageRepository: IImageRepository, transactionManager: ITransactionManager);
    execute(input: UpdateUserProfileUsecaseInput, userId: number): Promise<UpdateUserProfileUsecaseOutput>;
    private makeUpdateUserDetailParams;
}
