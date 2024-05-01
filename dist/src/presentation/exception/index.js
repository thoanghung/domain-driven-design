"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationError = exports.PresentationErrorDetailCode = exports.PresentationErrorCode = void 0;
exports.PresentationErrorCode = {
    BAD_REQUEST: 'BAD_REQUEST',
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};
exports.PresentationErrorDetailCode = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
};
class PresentationError extends Error {
    constructor(params) {
        super();
        this.code = params.code;
        this.message = params.message;
        this.info = params.info || null;
    }
}
exports.PresentationError = PresentationError;
//# sourceMappingURL=index.js.map