declare const users: {
    id: number;
    email: string;
    password: string;
    salt: string;
    userName: string;
    createdAt: Date;
    updatedAt: Date;
}[];
declare const posts: {
    id: number;
    content: string;
    tags: {
        list: string[];
    };
    images: {
        list: string[];
    };
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}[];
declare const comments: {
    id: number;
    userId: number;
    postId: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}[];
declare const likes: {
    id: number;
    userId: number;
    postId: number;
    createdAt: Date;
    updatedAt: Date;
}[];
export { users, posts, comments, likes };
