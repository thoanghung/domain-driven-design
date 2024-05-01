"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFactory = void 0;
const comment_1 = require("@domain/entity/post/comment");
const base_1 = require("../base");
class CommentFactory extends base_1.BaseFactory {
    createCommentEntity(comment) {
        if (!comment)
            return null;
        return this.createEntity(comment_1.CommentEntity, comment);
    }
    reconstruct(params) {
        return this.createEntity(comment_1.CommentEntity, {
            content: params.content,
            userId: params.userId,
            postId: params.postId,
        });
    }
}
exports.CommentFactory = CommentFactory;
//# sourceMappingURL=index.js.map