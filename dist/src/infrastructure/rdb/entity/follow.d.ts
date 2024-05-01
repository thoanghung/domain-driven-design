import BaseEntity from './base';
import User from './user';
export default class Follow extends BaseEntity {
    sourceUserId: number;
    destinationUserId: number;
    destinationUser: User;
    sourceUser: User;
}
