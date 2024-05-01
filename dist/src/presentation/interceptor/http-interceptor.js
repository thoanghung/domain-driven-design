"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpInterceptor = void 0;
const common_1 = require("@nestjs/common");
const logger_middleware_1 = require("@presentation/middleware/logger-middleware");
let HttpInterceptor = class HttpInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        (0, logger_middleware_1.requestLogger)(request);
        const response = context.switchToHttp().getResponse();
        return next
            .handle()
            .pipe();
    }
};
HttpInterceptor = __decorate([
    (0, common_1.Injectable)()
], HttpInterceptor);
exports.HttpInterceptor = HttpInterceptor;
//# sourceMappingURL=http-interceptor.js.map