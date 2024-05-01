"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = void 0;
const common_1 = require("@nestjs/common");
exports.HTTP_STATUS = {
    OK: common_1.HttpStatus.OK,
    UNAUTHORIZED: common_1.HttpStatus.UNAUTHORIZED,
    NOT_FOUND: common_1.HttpStatus.NOT_FOUND,
    INTERNAL_SERVER_ERROR: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
    GATEWAY_TIMEOUT: common_1.HttpStatus.GATEWAY_TIMEOUT,
};
//# sourceMappingURL=http-status.js.map