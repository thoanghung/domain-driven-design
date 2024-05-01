import BaseEntity from './base';
import Post from './post';
import UserDetail from './user-detail';
import Like from './like';
import Comment from './comment';
import Notification from './notification';
import Follow from './follow';
export default class User extends BaseEntity {
    email: string;
    password: string;
    userName: string;
    salt: string;
    userDetail: UserDetail;
    posts: Post[];
    likes: Like[];
    comments: Comment[];
    sentNotifications: Notification[];
    ownNotifications: Notification[];
    followers: Follow[];
    followings: Follow[];
}
