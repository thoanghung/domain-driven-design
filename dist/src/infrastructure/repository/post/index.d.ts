import { IPostRepository } from '@domain/repository/post';
import Repository from '@infrastructure/repository/base';
import { PostEntity as DomainPostEntity } from '@domain/entity/post';
export declare class PostRepository extends Repository<DomainPostEntity> implements IPostRepository {
    getById(transaction: TransactionType, id: number): Promise<DomainPostEntity | null>;
    save(transaction: TransactionType, post: DomainPostEntity): Promise<DomainPostEntity>;
    update(transaction: TransactionType, post: DomainPostEntity): Promise<DomainPostEntity>;
    deleteById(transaction: TransactionType, id: number): Promise<void>;
    private getBaseQuery;
}
