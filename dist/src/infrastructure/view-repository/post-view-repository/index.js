"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const post_1 = require("@infrastructure/view-factory/post");
const post_2 = require("@infrastructure/rdb/entity/post");
const postViewFactory = new post_1.default();
class PostViewRepository {
    async getPostDetail(id) {
        const repository = (0, typeorm_1.getRepository)(post_2.default);
        const query = this.getBaseQueryForPostDetail(repository);
        const post = await query.where('post.id = :id', { id }).getOne();
        return post
            ? postViewFactory.createPostDetailDto(post)
            : null;
    }
    async getUserPosts(userId) {
        const repository = (0, typeorm_1.getRepository)(post_2.default);
        const query = this.getBaseQueryForUserPost(repository);
        const posts = await query
            .where('postUser.id = :userId', { userId })
            .getMany();
        return posts.length > 0
            ? postViewFactory.createUserPosts(posts)
            : [];
    }
    getBaseQueryForPostDetail(repository) {
        const query = repository
            .createQueryBuilder('post')
            .select([
            'post.id',
            'post.content',
            'post.createdAt',
            'post.tags',
            'post.images',
            'like.id',
            'comment.id',
            'comment.content',
            'comment.createdAt',
            'commentUser.id',
            'commentUser.userName',
            'likeUser.id',
            'likeUser.userName',
            'postUser.id',
            'postUser.userName',
        ])
            .leftJoin('post.likes', 'like')
            .leftJoin('post.comments', 'comment')
            .leftJoin('comment.user', 'commentUser')
            .leftJoin('like.user', 'likeUser')
            .innerJoin('post.user', 'postUser');
        return query;
    }
    getBaseQueryForUserPost(repository) {
        const query = repository
            .createQueryBuilder('post')
            .select([
            'post.id',
            'post.images',
            'like.id',
            'comment.id',
            'postUser.id',
        ])
            .leftJoin('post.likes', 'like')
            .leftJoin('post.comments', 'comment')
            .innerJoin('post.user', 'postUser');
        return query;
    }
}
exports.default = PostViewRepository;
//# sourceMappingURL=index.js.map