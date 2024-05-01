"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const user_1 = require("@domain/entity/user");
const base_1 = require("@infrastructure/factory/base");
class UserFactory extends base_1.BaseFactory {
    createUserEntity(user) {
        if (!user)
            return null;
        const entity = this.createEntity(user_1.UserEntity, Object.assign(Object.assign({}, user), { detail: user.userDetail || null }));
        return entity;
    }
    createUserEntities(users) {
        if (!users)
            return null;
        return users.map((user) => this.createUserEntity(user));
    }
    createFromEmailAndPassword(emailVO, passwordVO) {
        const entity = this.createEntity(user_1.UserEntity, {
            userName: emailVO.toString(),
            password: passwordVO.toString(),
        });
        entity.email = emailVO;
        return entity;
    }
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=index.js.map