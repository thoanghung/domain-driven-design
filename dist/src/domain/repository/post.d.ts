import { BaseRepository } from './base';
import { PostEntity } from '../entity/post';
export declare abstract class IPostRepository extends BaseRepository {
    getById: (transaction: TransactionType, id: number) => Promise<PostEntity | null>;
    save: (transaction: TransactionType, post: PostEntity) => Promise<PostEntity>;
    update: (transaction: TransactionType, post: PostEntity) => Promise<PostEntity>;
    deleteById: (transaction: TransactionType, id: number) => Promise<void>;
}
