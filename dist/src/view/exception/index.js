"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewError = exports.ViewErrorDetailCode = exports.ViewErrorCode = void 0;
exports.ViewErrorCode = {
    BAD_REQUEST: 'BAD_REQUEST',
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};
exports.ViewErrorDetailCode = {
    USER_NOT_EXIST: 'USER_NOT_EXIST',
};
class ViewError extends Error {
    constructor(params) {
        super();
        this.code = params.code;
        this.message = params.message;
        this.info = params.info || null;
    }
}
exports.ViewError = ViewError;
//# sourceMappingURL=index.js.map