import BaseView from '../base';
import IUserViewRepository from '../view-repository/user-view-repository';
export default class UserProfileView extends BaseView {
    private readonly userViewRepository;
    constructor(userViewRepository: IUserViewRepository);
    getUserProfile(userId: number): Promise<import("../dto/user-profile-dto").UserProfileDto>;
}
