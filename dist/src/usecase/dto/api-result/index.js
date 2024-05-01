"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiWarn = exports.ApiError = exports.ApiResultCode = void 0;
const error_1 = require("@constants/error");
const warn_1 = require("@constants/warn");
const class_transformer_1 = require("@nestjs/class-transformer");
const swagger_1 = require("@nestjs/swagger");
const base_1 = require("../base");
exports.ApiResultCode = {
    OK: 'OK',
    WARN: 'WARN',
    ERROR: 'ERROR',
};
class ApiError extends base_1.default {
    constructor(code) {
        super();
        this.code = code;
        this.message = (0, error_1.getErrorMessage)(code);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error code',
        required: true,
        enum: error_1.ErrorCode,
        example: error_1.ErrorCode.SYSTEM_ERR,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ApiError.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error message',
        required: true,
        type: String,
        example: 'Internal server error',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ApiError.prototype, "message", void 0);
exports.ApiError = ApiError;
class ApiWarn extends base_1.default {
    constructor(code) {
        super();
        this.code = code;
        this.message = (0, warn_1.getWarnMessage)(code);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Warning code',
        required: true,
        enum: warn_1.WarnCode,
        example: warn_1.WarnCode.SYSTEM_WARN,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ApiWarn.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Warning message',
        required: true,
        type: String,
        example: 'FBI Warning',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ApiWarn.prototype, "message", void 0);
exports.ApiWarn = ApiWarn;
class ApiResultDto extends base_1.default {
    constructor(params) {
        super();
        this.code = params.code;
        this.message = params.message || '';
        this.warnList = params.warnList || [];
        this.errorList = params.errorList || [];
    }
    static ok() {
        return new ApiResultDto({
            code: exports.ApiResultCode.OK,
            warnList: [],
            errorList: [],
        });
    }
    static warn(warnList) {
        return new ApiResultDto({
            code: exports.ApiResultCode.WARN,
            warnList,
            errorList: [],
        });
    }
    static error(errorList) {
        return new ApiResultDto({
            code: exports.ApiResultCode.ERROR,
            warnList: [],
            errorList,
        });
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Api result code',
        required: true,
        enum: exports.ApiResultCode,
        example: exports.ApiResultCode.OK,
        default: exports.ApiResultCode.OK,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ApiResultDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Warning list',
        required: true,
        type: [ApiWarn],
        default: [],
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ApiResultDto.prototype, "warnList", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error list',
        required: true,
        type: [ApiError],
        default: [],
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ApiResultDto.prototype, "errorList", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Api result message',
        required: false,
        type: String,
        example: 'Success',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ApiResultDto.prototype, "message", void 0);
exports.default = ApiResultDto;
//# sourceMappingURL=index.js.map