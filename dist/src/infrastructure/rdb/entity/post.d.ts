import BaseEntity from './base';
import Like from './like';
import User from './user';
import Comment from './comment';
interface PostImagesProperty {
    list: string[];
}
interface PostTagsProperty {
    list: string[];
}
export default class Post extends BaseEntity {
    content: string;
    tags: PostTagsProperty;
    images: PostImagesProperty;
    userId: number;
    user: User;
    likes: Like[];
    comments: Comment[];
}
export {};
