import { EmailVO } from '../../value-object/email-vo';
import { PasswordVO } from '../../value-object/password-vo';
import { BaseEntity } from '../base';
import { UserDetailEntity, UserDetailGender } from './user-detail';
export interface UpdateDetailParams {
    nickName?: string;
    gender?: UserDetailGender;
    avatarURL?: string;
}
export declare class UserEntity extends BaseEntity {
    id?: number;
    email: EmailVO;
    userName: string;
    password?: PasswordVO;
    detail: UserDetailEntity;
    constructor();
    updateEmail(newEmail: string): void;
    updatePassword(newPassword: string): void;
    updateUserName(newUserName: string): void;
    updateDetail(params: UpdateDetailParams): void;
}
