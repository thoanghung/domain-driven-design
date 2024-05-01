import { BaseFactory } from '../base';
import { LikeEntity } from '@domain/entity/post/like';
import Like from '@infrastructure/rdb/entity/like';
export interface LikeEntityReconstructParams {
    postId: number;
    userId: number;
}
export declare class LikeFactory extends BaseFactory {
    createLikeEntity(like: Like | null): LikeEntity;
    reconstruct(params: LikeEntityReconstructParams): LikeEntity;
}
