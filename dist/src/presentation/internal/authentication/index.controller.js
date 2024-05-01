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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const http_status_1 = require("@constants/http-status");
const signin_1 = require("@usecase/authentication/signin");
const signup_1 = require("@usecase/authentication/signup");
let AuthenticationController = class AuthenticationController {
    constructor(signinUsecase, signupUsecase) {
        this.signinUsecase = signinUsecase;
        this.signupUsecase = signupUsecase;
    }
    signIn(input) {
        return this.signinUsecase.execute(input);
    }
    signUp(input) {
        return this.signupUsecase.execute(input);
    }
};
__decorate([
    (0, common_1.Post)('/sign-in'),
    (0, common_1.HttpCode)(http_status_1.HTTP_STATUS.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Sign in API',
        description: 'Sign in API',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Sign in payload',
        type: signin_1.SigninUsecaseInput,
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Sign in response',
        type: signin_1.SigninUsecaseOutput,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_1.SigninUsecaseInput]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/sign-up'),
    (0, common_1.HttpCode)(http_status_1.HTTP_STATUS.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Sign up API',
        description: 'Sign up API',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Sign up payload',
        type: signup_1.SignupUsecaseInput,
    }),
    (0, swagger_1.ApiResponse)({
        description: 'Sign up response',
        type: signup_1.SignupUsecaseOutput,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_1.SignupUsecaseInput]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "signUp", null);
AuthenticationController = __decorate([
    (0, swagger_1.ApiTags)('internal/auth'),
    (0, common_1.Controller)('internal/auth'),
    __metadata("design:paramtypes", [signin_1.default,
        signup_1.default])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=index.controller.js.map