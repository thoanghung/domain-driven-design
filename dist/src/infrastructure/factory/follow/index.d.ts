import { FollowEntity } from '@domain/entity/follow';
import Follow from '@infrastructure/rdb/entity/follow';
import { BaseFactory } from '../base';
interface ReconstructFollowParams {
    sourceUserId: number;
    destinationUserId: number;
}
export declare class FollowFactory extends BaseFactory {
    createFollowEntity(follow: Follow): FollowEntity;
    createFollowEntities(follows: Follow[]): FollowEntity[];
    reconstruct(params: ReconstructFollowParams): FollowEntity;
}
export {};
