"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_detail_dto_1 = require("@view/dto/post-detail-dto");
const base_1 = require("../base");
class PostViewFactory extends base_1.default {
    createPostDetailDto(params) {
        return this.createEntity(post_detail_dto_1.PostDetailDto, {
            id: params.id,
            content: params.content,
            createdAt: params.createdAt,
            tags: params.tags.list.map((tag) => tag),
            user: {
                id: params.user.id,
                userName: params.user.userName,
            },
            images: params.images.list.map((image) => image),
            comments: params.comments.map((comment) => ({
                id: comment.id,
                content: comment.content,
                createdAt: comment.createdAt,
                user: {
                    id: comment.user.id,
                    userName: comment.user.userName,
                },
            })),
            likes: params.likes.map((like) => ({
                id: like.id,
                user: {
                    id: like.user.id,
                    userName: like.user.userName,
                },
            })),
        });
    }
    createUserPostDto(params) {
        return {
            id: params.id,
            likesCount: params.likes.length,
            commentsCount: params.comments.length,
            thumbnail: params.images.list[0],
        };
    }
    createUserPosts(params) {
        return params.map((param) => this.createUserPostDto(param));
    }
}
exports.default = PostViewFactory;
//# sourceMappingURL=index.js.map