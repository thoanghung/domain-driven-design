"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = exports.DomainErrorDetailCode = exports.DomainErrorCode = void 0;
exports.DomainErrorCode = {
    BAD_REQUEST: 'BAD_REQUEST',
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};
exports.DomainErrorDetailCode = {
    INVALID_EMAIL_FORMAT: 'INVALID_EMAIL_FORMAT',
    USER_NAME_CAN_NOT_BE_EMPTY: 'USER_NAME_CAN_NOT_BE_EMPTY',
    INVALID_PASSWORD_FORMAT: 'INVALID_PASSWORD_FORMAT',
};
class DomainError extends Error {
    constructor(params) {
        super();
        this.code = params.code;
        this.message = params.message;
        this.info = params.info || null;
    }
}
exports.DomainError = DomainError;
//# sourceMappingURL=index.js.map