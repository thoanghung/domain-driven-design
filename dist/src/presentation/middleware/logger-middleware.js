"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseErrorLogger = exports.responseLogger = exports.requestLogger = void 0;
const dayjs = require("dayjs");
const util = require("util");
const logger_1 = require("@utils/logger");
const common_1 = require("@nestjs/common");
const maskData = require('maskdata');
const _maskFields = (object, fields) => {
    const maskOptions = {
        maskWith: '*',
        fields,
    };
    return maskData.maskJSONFields(object, maskOptions);
};
const requestLogger = (request) => {
    const { ip, originalUrl, method, params, query, body, headers } = request;
    const logTemplate = '%s %s %s %s %s';
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');
    const logContent = util.formatWithOptions({ colors: true }, logTemplate, now, ip, method, originalUrl, JSON.stringify({
        method,
        url: originalUrl,
        userAgent: headers['user-agent'],
        body: _maskFields(body, ['password']),
        params,
        query,
    }));
    logger_1.default.access_req.info(logContent);
};
exports.requestLogger = requestLogger;
const responseLogger = (input) => {
    const { requestId, response, data } = input;
    const log = {
        requestId,
        statusCode: response.statusCode,
        data: data.data,
    };
    logger_1.default.access_res.info(JSON.stringify(log));
};
exports.responseLogger = responseLogger;
const responseErrorLogger = (input) => {
    const { requestId, exception } = input;
    const log = {
        requestId,
        statusCode: exception instanceof common_1.HttpException ? exception.getStatus() : null,
        message: (exception === null || exception === void 0 ? void 0 : exception.stack) || (exception === null || exception === void 0 ? void 0 : exception.message),
    };
    logger_1.default.access_res.info(JSON.stringify(log));
    logger_1.default.access_res.error(exception);
};
exports.responseErrorLogger = responseErrorLogger;
//# sourceMappingURL=logger-middleware.js.map