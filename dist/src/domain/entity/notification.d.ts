import { BaseEntity } from './base';
export declare const NotifyType: {
    readonly LikePost: "LikePost";
    readonly CommentPost: "CommentPost";
};
export type NotifyType = typeof NotifyType[keyof typeof NotifyType];
export declare class NotificationEntity extends BaseEntity {
    id?: number;
    ownerId: number;
    sourceUserId: number;
    postId: number;
    content: string;
    type: NotifyType;
    read: boolean;
}
