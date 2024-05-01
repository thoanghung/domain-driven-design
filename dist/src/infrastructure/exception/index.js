"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureError = exports.InfrastructureErrorDetailCode = exports.InfrastructureErrorCode = void 0;
exports.InfrastructureErrorCode = {
    BAD_REQUEST: 'BAD_REQUEST',
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};
exports.InfrastructureErrorDetailCode = {
    CAN_NOT_GET_PUT_URL: 'CAN_NOT_GET_PUT_URL',
    UPLOAD_IMAGE_TO_IMAGE_SERVER_FAILED: 'UPLOAD_IMAGE_TO_IMAGE_SERVER_FAILED',
    RDB_USER_NOT_EXIST: 'RDB_USER_NOT_EXIST',
    MUST_SPECIFY_USER_ID: 'MUST_SPECIFY_USER_ID',
    MUST_SPECIFY_USER_DETAIL_ID: 'MUST_SPECIFY_USER_DETAIL_ID',
    IMAGE_KEY_CAN_NOT_BE_EMPTY: 'IMAGE_KEY_CAN_NOT_BE_EMPTY',
    MUST_SPECIFY_POST_ID: 'MUST_SPECIFY_POST_ID',
    RDB_POST_NOT_EXIST: 'RDB_POST_NOT_EXIST',
    MUST_SPECIFY_COMMENT_ID: 'MUST_SPECIFY_COMMENT_ID',
    RDB_COMMENT_NOT_EXIST: 'RDB_COMMENT_NOT_EXIST',
};
class InfrastructureError extends Error {
    constructor(params) {
        super();
        this.code = params.code;
        this.message = params.message;
        this.info = params.info || null;
    }
}
exports.InfrastructureError = InfrastructureError;
//# sourceMappingURL=index.js.map