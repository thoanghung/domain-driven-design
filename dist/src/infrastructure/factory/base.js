"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFactory = void 0;
const class_transformer_1 = require("@nestjs/class-transformer");
class BaseFactory {
    createEntity(entity, plain) {
        return (0, class_transformer_1.plainToClass)(entity, plain, {
            excludeExtraneousValues: true,
        });
    }
    createEntityArray(entity, plains) {
        return (0, class_transformer_1.plainToClass)(entity, plains, { excludeExtraneousValues: true });
    }
}
exports.BaseFactory = BaseFactory;
//# sourceMappingURL=base.js.map