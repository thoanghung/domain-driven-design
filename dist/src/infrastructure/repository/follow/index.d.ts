import { IFollowRepository } from '@domain/repository/follow';
import { FollowEntity as DomainFollowEntity } from '@domain/entity/follow';
import Repository from '../base';
export declare class FollowRepository extends Repository<DomainFollowEntity> implements IFollowRepository {
    getById(transaction: TransactionType, id: number): Promise<DomainFollowEntity | null>;
    getByUserIds(transaction: TransactionType, sourceUserId: number, destinationUserId: number): Promise<DomainFollowEntity>;
    save(transaction: TransactionType, follow: DomainFollowEntity): Promise<DomainFollowEntity>;
    deleteById(transaction: TransactionType, id: number): Promise<void>;
    private getBaseQuery;
}
