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
exports.SigninUsecaseOutput = exports.SigninUsecaseInput = void 0;
const base_1 = require("../../base");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_1 = require("@domain/repository/user");
const exception_1 = require("@usecase/exception");
const authenticate_1 = require("@domain/repository/authenticate");
const api_result_1 = require("@usecase/dto/api-result");
class SigninUsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address',
        required: true,
    }),
    __metadata("design:type", String)
], SigninUsecaseInput.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password',
        required: true,
        format: 'password',
    }),
    __metadata("design:type", String)
], SigninUsecaseInput.prototype, "password", void 0);
exports.SigninUsecaseInput = SigninUsecaseInput;
class SigninUsecaseOutputData {
    constructor(params) {
        this.jwt = params.jwt;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT Token',
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], SigninUsecaseOutputData.prototype, "jwt", void 0);
class SigninUsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Api result',
        type: api_result_1.default,
        required: true,
    }),
    __metadata("design:type", api_result_1.default)
], SigninUsecaseOutput.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Api data',
        type: SigninUsecaseOutputData,
        required: true,
    }),
    __metadata("design:type", SigninUsecaseOutputData)
], SigninUsecaseOutput.prototype, "data", void 0);
exports.SigninUsecaseOutput = SigninUsecaseOutput;
let SigninUsecase = class SigninUsecase extends base_1.Usecase {
    constructor(userRepository, authenticateRepository) {
        super();
        this.userRepository = userRepository;
        this.authenticateRepository = authenticateRepository;
    }
    async execute(input) {
        const { email, password } = input;
        if (!email || !password) {
            throw new exception_1.UsecaseError({
                message: 'Must specify email and password',
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.MUST_SPECIFY_EMAIL_AND_PASSWORD,
                },
            });
        }
        const user = await this.userRepository.getByEmail(null, email);
        if (!user) {
            throw new exception_1.UsecaseError({
                message: 'Email does not exist',
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.EMAIL_DOES_NOT_EXISTS,
                },
            });
        }
        const result = await this.authenticateRepository.validatePassword(email, password);
        if (!result) {
            throw new exception_1.UsecaseError({
                message: 'Invalid email or password',
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.INVALID_EMAIL_OR_PASSWORD,
                },
            });
        }
        const jwt = this.authenticateRepository.getJWT(user.id, user.email.toString());
        const output = new SigninUsecaseOutput();
        output.result = api_result_1.default.ok();
        output.data = new SigninUsecaseOutputData({ jwt });
        return output;
    }
};
SigninUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(authenticate_1.IAuthenticateRepository)),
    __metadata("design:paramtypes", [user_1.IUserRepository,
        authenticate_1.IAuthenticateRepository])
], SigninUsecase);
exports.default = SigninUsecase;
//# sourceMappingURL=index.js.map