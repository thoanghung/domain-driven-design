import { Gender } from '@infrastructure/rdb/entity/user-detail';
import BaseDto from './base';
declare class UserProfileDetailDto extends BaseDto {
    nickName: string;
    avatarURL: string;
    gender: Gender;
    constructor();
}
export declare class UserProfileDto extends BaseDto {
    email: string;
    userName: string;
    detail: UserProfileDetailDto;
    constructor();
}
export {};
