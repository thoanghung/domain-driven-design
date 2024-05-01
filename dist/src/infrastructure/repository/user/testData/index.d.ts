declare const users: {
    id: number;
    email: string;
    password: string;
    salt: string;
    userName: string;
    createdAt: Date;
    updatedAt: Date;
}[];
declare const userDetails: {
    id: number;
    userId: number;
    nickName: string;
    avatarURL: string;
    gender: "Male";
    createdAt: Date;
    updatedAt: Date;
}[];
export { users, userDetails };
