"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWarnMessage = exports.WARN_MESSAGE = exports.WarnCode = void 0;
var WarnCode;
(function (WarnCode) {
    WarnCode["SYSTEM_WARN"] = "SYSTEM_WARN";
})(WarnCode = exports.WarnCode || (exports.WarnCode = {}));
exports.WARN_MESSAGE = {
    [WarnCode.SYSTEM_WARN]: 'System warning',
};
const getWarnMessage = (warnCode) => {
    return exports.WARN_MESSAGE[warnCode];
};
exports.getWarnMessage = getWarnMessage;
//# sourceMappingURL=warn.js.map