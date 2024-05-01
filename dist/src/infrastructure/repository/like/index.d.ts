import Repository from '../base';
import { LikeEntity as DomainLikeEntity } from '@domain/entity/post/like';
import { ILikeRepository } from '@domain/repository/like';
export declare class LikeRepository extends Repository<DomainLikeEntity> implements ILikeRepository {
    getByPostAndUserId(transaction: TransactionType | null, postId: number, userId: number): Promise<DomainLikeEntity>;
    getById(transaction: TransactionType, id: number): Promise<DomainLikeEntity>;
    save(transaction: TransactionType, likeEntity: DomainLikeEntity): Promise<DomainLikeEntity>;
    deleteById(transaction: TransactionType, id: number): Promise<void>;
    private getBaseQuery;
}
