"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowFactory = void 0;
const follow_1 = require("@domain/entity/follow");
const base_1 = require("../base");
class FollowFactory extends base_1.BaseFactory {
    createFollowEntity(follow) {
        return this.createEntity(follow_1.FollowEntity, follow);
    }
    createFollowEntities(follows) {
        return follows.map((follow) => this.createFollowEntity(follow));
    }
    reconstruct(params) {
        return this.createEntity(follow_1.FollowEntity, {
            sourceUserId: params.sourceUserId,
            destinationUserId: params.destinationUserId,
        });
    }
}
exports.FollowFactory = FollowFactory;
//# sourceMappingURL=index.js.map