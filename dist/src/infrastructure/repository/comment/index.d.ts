import { CommentEntity as DomainCommentEntity } from '@domain/entity/post/comment';
import { ICommentRepository } from '@domain/repository/comment';
import Repository from '../base';
export declare class CommentRepository extends Repository<DomainCommentEntity> implements ICommentRepository {
    getById(transaction: TransactionType, id: number): Promise<DomainCommentEntity>;
    save(transaction: TransactionType, comment: DomainCommentEntity): Promise<DomainCommentEntity>;
    update(transaction: TransactionType, comment: DomainCommentEntity): Promise<DomainCommentEntity>;
    deleteById(transaction: TransactionType, id: number): Promise<void>;
    private getBaseQuery;
}
