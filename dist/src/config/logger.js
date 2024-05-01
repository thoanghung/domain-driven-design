"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerConfig = void 0;
exports.loggerConfig = {
    appenders: {
        default: { type: 'console', layout: { type: 'colored' } },
        sql: { type: 'console', layout: { type: 'colored' } },
    },
    categories: {
        default: { appenders: ['default'], level: 'ALL', enableCallStack: true },
        sql: { appenders: ['sql'], level: 'ALL' },
    },
    disableClustering: true,
};
//# sourceMappingURL=logger.js.map