"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVO = void 0;
const base_1 = require("./base");
const zod_1 = require("zod");
const exception_1 = require("@domain/exception");
const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const mailSchema = zod_1.z.string().regex(mailRegex);
class EmailVO extends base_1.ValueObject {
    constructor(input) {
        super();
        try {
            mailSchema.parse(input);
            this.value = input;
        }
        catch (e) {
            throw new exception_1.DomainError({
                code: exception_1.DomainErrorCode.BAD_REQUEST,
                message: 'Invalid email format',
                info: {
                    detailCode: exception_1.DomainErrorDetailCode.INVALID_EMAIL_FORMAT,
                },
            });
        }
    }
    toString() {
        return this.value;
    }
}
exports.EmailVO = EmailVO;
//# sourceMappingURL=email-vo.js.map