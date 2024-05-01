import { BaseEntity } from '../base';
export declare enum UserDetailGender {
    Male = "Male",
    Female = "Female"
}
export declare class UserDetailEntity extends BaseEntity {
    id?: number;
    active: boolean;
    nickName: string;
    avatarURL: string;
    gender: UserDetailGender;
    constructor();
    get isActive(): boolean;
}
