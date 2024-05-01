"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const exception_1 = require("@domain/exception");
const exception_2 = require("@infrastructure/exception");
const common_1 = require("@nestjs/common");
const exception_3 = require("@presentation/exception");
const exception_4 = require("@usecase/exception");
const exception_5 = require("@view/exception");
const rxjs_1 = require("rxjs");
let ErrorInterceptor = class ErrorInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.catchError)((err) => {
            let responseError;
            if (err instanceof exception_4.UsecaseError) {
                switch (err.code) {
                    case exception_4.UsecaseErrorCode.BAD_REQUEST:
                        responseError = new common_1.BadRequestException(err.message, JSON.stringify(err.info));
                        break;
                    case exception_4.UsecaseErrorCode.NOT_FOUND:
                        responseError = new common_1.NotFoundException(err.message, JSON.stringify(err.info));
                        break;
                    case exception_4.UsecaseErrorCode.INTERNAL_SERVER_ERROR:
                    default:
                        responseError = new common_1.InternalServerErrorException(err.message, JSON.stringify(err.info));
                        break;
                }
            }
            else if (err instanceof exception_1.DomainError) {
                switch (err.code) {
                    case exception_1.DomainErrorCode.BAD_REQUEST:
                        responseError = new common_1.BadRequestException(err.message, JSON.stringify(err.info));
                        break;
                    case exception_1.DomainErrorCode.NOT_FOUND:
                        responseError = new common_1.NotFoundException(err.message, JSON.stringify(err.info));
                        break;
                    case exception_1.DomainErrorCode.INTERNAL_SERVER_ERROR:
                    default:
                        responseError = new common_1.InternalServerErrorException(err.message, JSON.stringify(err.info));
                        break;
                }
            }
            else if (err instanceof exception_2.InfrastructureError) {
                switch (err.code) {
                    case exception_2.InfrastructureErrorCode.BAD_REQUEST:
                        responseError = new common_1.BadRequestException(err.message, JSON.stringify(err.info));
                        break;
                    case exception_2.InfrastructureErrorCode.NOT_FOUND:
                        responseError = new common_1.NotFoundException(err.message, JSON.stringify(err.info));
                        break;
                    case exception_2.InfrastructureErrorCode.INTERNAL_SERVER_ERROR:
                    default:
                        responseError = new common_1.InternalServerErrorException(err.message, JSON.stringify(err.info));
                        break;
                }
            }
            else if (err instanceof exception_3.PresentationError) {
                switch (err.code) {
                    case exception_3.PresentationErrorCode.BAD_REQUEST:
                        responseError = new common_1.BadRequestException(err.message, JSON.stringify(err.info));
                        break;
                    case exception_3.PresentationErrorCode.NOT_FOUND:
                        responseError = new common_1.NotFoundException(err.message, JSON.stringify(err.info));
                        break;
                    case exception_3.PresentationErrorCode.INTERNAL_SERVER_ERROR:
                    default:
                        responseError = new common_1.InternalServerErrorException(err.message, JSON.stringify(err.info));
                        break;
                }
            }
            else if (err instanceof exception_5.ViewError) {
                switch (err.code) {
                    case exception_5.ViewErrorCode.BAD_REQUEST:
                        responseError = new common_1.BadRequestException(err.message, JSON.stringify(err.info));
                        break;
                    case exception_5.ViewErrorCode.NOT_FOUND:
                        responseError = new common_1.NotFoundException(err.message, JSON.stringify(err.info));
                        break;
                    case exception_5.ViewErrorCode.INTERNAL_SERVER_ERROR:
                    default:
                        responseError = new common_1.InternalServerErrorException(err.message, JSON.stringify(err.info));
                        break;
                }
            }
            else {
                switch (err.response.error) {
                    case 'Payload Too Large':
                        responseError = new common_1.BadRequestException(err.response.error, JSON.stringify(err.response));
                        break;
                    default:
                        responseError = new common_1.InternalServerErrorException(err.message || 'Internal Server Error');
                        break;
                }
            }
            return (0, rxjs_1.throwError)(() => responseError);
        }));
    }
};
ErrorInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorInterceptor);
exports.ErrorInterceptor = ErrorInterceptor;
//# sourceMappingURL=error-interceptor.js.map