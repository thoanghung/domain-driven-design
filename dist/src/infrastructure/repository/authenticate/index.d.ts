import { IAuthenticateRepository } from '@domain/repository/authenticate';
export declare class AuthenticateRepository implements IAuthenticateRepository {
    getJWT(userId: number, email: string): string;
    isEmailBeingUsed(email: string): Promise<boolean>;
    validatePassword(email: string, password: string): Promise<boolean>;
    private getBaseQuery;
}
