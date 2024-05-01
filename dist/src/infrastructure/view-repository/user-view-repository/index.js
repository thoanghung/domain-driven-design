"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("@infrastructure/rdb/entity/user");
const post_1 = require("@infrastructure/rdb/entity/post");
const user_2 = require("@infrastructure/view-factory/user");
const userViewFactory = new user_2.default();
const USER_FEED_LIMIT = 9;
class UserViewRepository {
    async getUserProfileById(id) {
        const repository = (0, typeorm_1.getRepository)(user_1.default);
        const query = this.getBaseQueryForGettingUserProfile(repository);
        const user = await query.where('user.id = :id', { id }).getOne();
        return user ? userViewFactory.createUserProfileDto(user) : null;
    }
    async getUserFeed(userId, options) {
        const limit = options.limit || USER_FEED_LIMIT;
        const offset = options.page ? (options.page - 1) * limit : 0;
        const orderBy = options.orderBy || 'DESC';
        const userRDBRepository = (0, typeorm_1.getRepository)(user_1.default);
        const postRDBRepository = (0, typeorm_1.getRepository)(post_1.default);
        const getFollowingUsersQuery = this.getBaseQueryForGettingFollowingUser(userRDBRepository);
        const result = await getFollowingUsersQuery
            .where('user.id = :userId', { userId })
            .getMany();
        const followingUserIds = [];
        result.forEach((res) => {
            res.followers.forEach((follower) => {
                followingUserIds.push(follower.destinationUser.id);
            });
        });
        followingUserIds.push(userId);
        const getUserFeedQuery = this.getBaseQueryForGettingUserFeed(postRDBRepository);
        const userFeed = await getUserFeedQuery
            .where('post.userId IN (:...userIds)', {
            userIds: followingUserIds,
        })
            .orderBy('post.createdAt', orderBy)
            .take(options.limit || USER_FEED_LIMIT)
            .skip(offset)
            .getMany();
        return userFeed.length > 0
            ? userViewFactory.createUserFeedPostDtoList(userFeed)
            : [];
    }
    getBaseQueryForGettingUserProfile(repository) {
        const query = repository
            .createQueryBuilder('user')
            .select([
            'user.email',
            'user.userName',
            'userDetail.nickName',
            'userDetail.avatarURL',
            'userDetail.gender',
        ])
            .leftJoin('user.userDetail', 'userDetail');
        return query;
    }
    getBaseQueryForGettingFollowingUser(repository) {
        const query = repository
            .createQueryBuilder('user')
            .select(['user.id', 'following.id', 'followingUser.id'])
            .leftJoin('user.followers', 'following')
            .leftJoin('following.destinationUser', 'followingUser');
        return query;
    }
    getBaseQueryForGettingUserFeed(repository) {
        const query = repository
            .createQueryBuilder('post')
            .select([
            'post.id',
            'post.content',
            'post.tags',
            'post.images',
            'post.createdAt',
            'user.id',
            'user.userName',
            'userDetail.id',
            'userDetail.avatarURL',
            'postLikes.id',
            'postComments.id',
            'postComments.content',
            'postComments.createdAt',
            'postCommentUser.id',
            'postCommentUser.userName',
            'postCommentUserDetail.avatarURL',
        ])
            .leftJoin('post.likes', 'postLikes')
            .leftJoin('post.comments', 'postComments')
            .leftJoin('post.user', 'user')
            .leftJoin('user.userDetail', 'userDetail')
            .leftJoin('postComments.user', 'postCommentUser')
            .leftJoin('postCommentUser.userDetail', 'postCommentUserDetail');
        return query;
    }
}
exports.default = UserViewRepository;
//# sourceMappingURL=index.js.map