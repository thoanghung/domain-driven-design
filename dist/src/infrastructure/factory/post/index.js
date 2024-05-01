"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactory = void 0;
const post_1 = require("@domain/entity/post");
const base_1 = require("../base");
class PostFactory extends base_1.BaseFactory {
    createPostEntity(post) {
        if (!post)
            return null;
        const createEntityParams = this.reconstruct(post);
        return this.createEntity(post_1.PostEntity, createEntityParams);
    }
    reconstruct(post) {
        return {
            id: post.id,
            images: post.images.list,
            tags: post.tags.list,
            content: post.content,
            userId: post.user.id,
            likes: post.likes,
            comments: post.comments,
            createdAt: post.createdAt,
        };
    }
    createNewPostEntity(content, imageUrls, tags, userId) {
        const entity = this.createEntity(post_1.PostEntity, {
            content,
            tags,
            images: imageUrls,
            userId,
        });
        return entity;
    }
}
exports.PostFactory = PostFactory;
//# sourceMappingURL=index.js.map