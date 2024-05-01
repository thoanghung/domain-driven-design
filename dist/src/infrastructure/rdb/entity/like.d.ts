import BaseEntity from './base';
import Post from './post';
import User from './user';
export default class Like extends BaseEntity {
    userId: number;
    postId: number;
    user: User;
    post: Post;
}
