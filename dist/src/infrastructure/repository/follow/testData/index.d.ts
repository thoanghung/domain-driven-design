declare const users: {
    id: number;
    email: string;
    password: string;
    salt: string;
    userName: string;
    createdAt: Date;
    updatedAt: Date;
}[];
declare const follows: {
    id: number;
    sourceUserId: number;
    destinationUserId: number;
}[];
export { users, follows };
