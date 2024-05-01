import BaseEntity from './base';
import Post from './post';
import User from './user';
export default class Comment extends BaseEntity {
    content: string;
    userId: number;
    postId: number;
    user: User;
    post: Post;
}
