import BaseEntity from './base';
import User from './user';
declare const NotificationType: {
    readonly FollowNotify: "FollowNotify";
    readonly PostLikeNotify: "PostLikeNotify";
    readonly PostCommentNotify: "PostCommentNotify";
};
export type NotificationType = typeof NotificationType[keyof typeof NotificationType];
export default class Notification extends BaseEntity {
    ownerId: number;
    sourceUserId: number;
    content: string;
    postId: number;
    type: NotificationType;
    read: boolean;
    image: string;
    owner: User;
    sourceUser: User;
}
export {};
