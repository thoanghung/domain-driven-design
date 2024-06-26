import { BaseRepository } from '@domain/repository/base';
export declare abstract class IAuthenticateRepository extends BaseRepository {
    getJWT: (userId: number, email: string) => string;
    isEmailBeingUsed: (email: string) => Promise<boolean>;
    validatePassword: (email: string, password: string) => Promise<boolean>;
}
