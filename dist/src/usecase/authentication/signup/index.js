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
exports.SignupUsecaseOutput = exports.SignupUsecaseInput = void 0;
const authenticate_1 = require("@domain/repository/authenticate");
const transaction_1 = require("@domain/repository/transaction");
const user_1 = require("@domain/repository/user");
const email_vo_1 = require("@domain/value-object/email-vo");
const password_vo_1 = require("@domain/value-object/password-vo");
const user_2 = require("@infrastructure/factory/user");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("@usecase/dto/api-result");
const exception_1 = require("@usecase/exception");
const base_1 = require("../../base");
class SignupUsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address',
        required: true,
    }),
    __metadata("design:type", String)
], SignupUsecaseInput.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password',
        required: true,
    }),
    __metadata("design:type", String)
], SignupUsecaseInput.prototype, "password", void 0);
exports.SignupUsecaseInput = SignupUsecaseInput;
class SignupUsecaseOutputData {
    constructor(params) {
        this.jwt = params.jwt;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT Token',
        required: true,
    }),
    __metadata("design:type", String)
], SignupUsecaseOutputData.prototype, "jwt", void 0);
class SignupUsecaseOutput extends base_1.UsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Api Result',
        required: true,
        type: api_result_1.default,
    }),
    __metadata("design:type", api_result_1.default)
], SignupUsecaseOutput.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Api Data',
        required: true,
        type: SignupUsecaseOutputData,
    }),
    __metadata("design:type", SignupUsecaseOutputData)
], SignupUsecaseOutput.prototype, "data", void 0);
exports.SignupUsecaseOutput = SignupUsecaseOutput;
const userFactory = new user_2.UserFactory();
let SignupUsecase = class SignupUsecase extends base_1.Usecase {
    constructor(userRepository, authenRepository, transactionManager) {
        super();
        this.userRepository = userRepository;
        this.authenRepository = authenRepository;
        this.transactionManager = transactionManager;
    }
    async execute(input) {
        const { email, password } = input;
        let jwt = '';
        if (!email || !password) {
            throw new exception_1.UsecaseError({
                message: 'Must specify email and password',
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.MUST_SPECIFY_EMAIL_AND_PASSWORD,
                },
            });
        }
        const emailVO = new email_vo_1.EmailVO(email);
        const passwordVO = new password_vo_1.PasswordVO(password);
        const isEmailBeingUsed = await this.authenRepository.isEmailBeingUsed(email);
        if (isEmailBeingUsed) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.BAD_REQUEST,
                message: 'Email is being used',
                info: {
                    detailCode: exception_1.UsecaseErrorDetailCode.EMAIL_IS_BEING_USED,
                },
            });
        }
        const userEntity = userFactory.createFromEmailAndPassword(emailVO, passwordVO);
        try {
            await this.transactionManager.transaction(async (transaction) => {
                const createdUserEntity = await this.userRepository.save(transaction, userEntity);
                jwt = this.authenRepository.getJWT(createdUserEntity.id, createdUserEntity.email.toString());
            });
        }
        catch (error) {
            throw new exception_1.UsecaseError({
                code: exception_1.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            });
        }
        const output = new SignupUsecaseOutput();
        output.data = new SignupUsecaseOutputData({ jwt });
        output.result = api_result_1.default.ok();
        return output;
    }
};
SignupUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(authenticate_1.IAuthenticateRepository)),
    __param(2, (0, common_1.Inject)(transaction_1.default)),
    __metadata("design:paramtypes", [user_1.IUserRepository,
        authenticate_1.IAuthenticateRepository,
        transaction_1.default])
], SignupUsecase);
exports.default = SignupUsecase;
//# sourceMappingURL=index.js.map