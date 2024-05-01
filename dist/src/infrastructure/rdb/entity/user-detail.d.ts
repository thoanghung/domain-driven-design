import BaseEntity from './base';
import User from './user';
export declare const Gender: {
    readonly Male: "Male";
    readonly Female: "Female";
};
export type Gender = typeof Gender[keyof typeof Gender];
export default class UserDetail extends BaseEntity {
    nickName: string;
    avatarURL: string;
    gender: Gender;
    userId: number;
    user: User;
}
