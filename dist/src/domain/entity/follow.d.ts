import { BaseEntity } from './base';
export declare class FollowEntity extends BaseEntity {
    id?: number;
    sourceUserId: number;
    destinationUserId: number;
}
