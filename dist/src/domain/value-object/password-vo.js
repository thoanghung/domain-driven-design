"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordVO = void 0;
const base_1 = require("./base");
const zod_1 = require("zod");
const exception_1 = require("@domain/exception");
const passwordCheckerRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const passwordSchema = zod_1.z.string().regex(passwordCheckerRegex);
class PasswordVO extends base_1.ValueObject {
    constructor(input) {
        super();
        try {
            passwordSchema.parse(input);
            this.value = input;
        }
        catch (e) {
            throw new exception_1.DomainError({
                code: exception_1.DomainErrorCode.BAD_REQUEST,
                message: 'Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters',
                info: {
                    detailCode: exception_1.DomainErrorDetailCode.INVALID_PASSWORD_FORMAT,
                },
            });
        }
    }
    toString() {
        return this.value;
    }
}
exports.PasswordVO = PasswordVO;
//# sourceMappingURL=password-vo.js.map