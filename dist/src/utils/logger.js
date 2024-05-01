"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const logger_1 = require("@config/logger");
class Logger {
    constructor() {
        log4js.configure(logger_1.loggerConfig);
        this.system = log4js.getLogger('system');
        this.api = log4js.getLogger('api');
        this.access_req = log4js.getLogger('access_req');
        this.access_res = log4js.getLogger('access_res');
        this.sql = log4js.getLogger('sql');
        this.auth = log4js.getLogger('auth');
    }
}
exports.default = new Logger();
//# sourceMappingURL=logger.js.map