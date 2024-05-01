"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_custom_name_strategy_1 = require("../typeorm-custom-name-strategy");
const __1 = require("../../");
const user_1 = require("@infrastructure/rdb/entity/user");
const user_detail_1 = require("@infrastructure/rdb/entity/user-detail");
const post_1 = require("@infrastructure/rdb/entity/post");
const like_1 = require("@infrastructure/rdb/entity/like");
const comment_1 = require("@infrastructure/rdb/entity/comment");
const follow_1 = require("@infrastructure/rdb/entity/follow");
const notification_1 = require("@infrastructure/rdb/entity/notification");
const getConnection = () => {
    const entities = [
        user_1.default,
        user_detail_1.default,
        post_1.default,
        like_1.default,
        comment_1.default,
        follow_1.default,
        notification_1.default,
    ];
    return typeorm_1.TypeOrmModule.forRoot({
        type: __1.default.type,
        host: __1.default.host,
        port: __1.default.port,
        username: __1.default.username,
        password: __1.default.password,
        database: __1.default.database,
        entities,
        timezone: 'Z',
        synchronize: false,
        logging: true,
        namingStrategy: new typeorm_custom_name_strategy_1.default(),
    });
};
exports.connection = getConnection();
//# sourceMappingURL=index.js.map