"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeFactory = void 0;
const base_1 = require("../base");
const like_1 = require("@domain/entity/post/like");
class LikeFactory extends base_1.BaseFactory {
    createLikeEntity(like) {
        if (!like)
            return null;
        return this.createEntity(like_1.LikeEntity, like);
    }
    reconstruct(params) {
        return this.createEntity(like_1.LikeEntity, params);
    }
}
exports.LikeFactory = LikeFactory;
//# sourceMappingURL=index.js.map