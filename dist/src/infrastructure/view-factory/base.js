"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("@nestjs/class-transformer");
class BaseViewFactory {
    createEntity(entity, plain) {
        return (0, class_transformer_1.plainToClass)(entity, plain, {
            excludeExtraneousValues: true,
        });
    }
    createEntityArray(entity, plains) {
        return (0, class_transformer_1.plainToClass)(entity, plains, { excludeExtraneousValues: true });
    }
}
exports.default = BaseViewFactory;
//# sourceMappingURL=base.js.map