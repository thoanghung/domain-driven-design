"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.ERROR_MESSAGE = exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["SYSTEM_ERR"] = "SYSTEM_ERR";
    ErrorCode["INVALID_PASSWORD_ERR"] = "INVALID_PASSWORD_ERR";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
exports.ERROR_MESSAGE = {
    [ErrorCode.SYSTEM_ERR]: 'Internal Server Error',
    [ErrorCode.INVALID_PASSWORD_ERR]: 'Invalid password',
};
const getErrorMessage = (errorCode) => {
    return exports.ERROR_MESSAGE[errorCode];
};
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=error.js.map