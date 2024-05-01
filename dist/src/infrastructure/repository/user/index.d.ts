import { UserEntity as DomainUserEntity } from '@domain/entity/user';
import { IUserRepository } from '@domain/repository/user';
import { Transaction } from '@infrastructure/repository/transaction';
import Repository from '@infrastructure/repository/base';
export declare class UserRepository extends Repository<DomainUserEntity> implements IUserRepository {
    getByEmail(transaction: Transaction | null, email: string): Promise<DomainUserEntity | null>;
    getByIds(transaction: Transaction | null, ids: number[]): Promise<DomainUserEntity[]>;
    save(transaction: TransactionType, user: DomainUserEntity): Promise<DomainUserEntity>;
    getById(transaction: TransactionType, id: number): Promise<DomainUserEntity>;
    update(transaction: TransactionType, user: DomainUserEntity): Promise<DomainUserEntity>;
    private updateUserDetail;
    private getBaseQuery;
}
