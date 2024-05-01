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
export { posts, users };
