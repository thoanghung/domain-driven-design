"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const exception_1 = require("@presentation/exception");
const encrypt_1 = require("@utils/encrypt");
const http_status_1 = require("@constants/http-status");
class AuthMiddleware {
    use(req, res, next) {
        const authToken = req.headers.authorization;
        const [valid, decoded, err] = this.authorize(authToken);
        if (!valid) {
            res.sendStatus(http_status_1.HTTP_STATUS.UNAUTHORIZED);
            return;
        }
        const user = encrypt_1.AuthenTokenParamsSchema.safeParse(decoded);
        if (user.success === false) {
            res.sendStatus(http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
            return;
        }
        req['user'] = user.data;
        next();
    }
    authorize(authToken) {
        if (!authToken || !(authToken.split(' ')[0] === 'Bearer'))
            return [
                false,
                undefined,
                new exception_1.PresentationError({
                    code: exception_1.PresentationErrorCode.BAD_REQUEST,
                    message: 'Unauthorized',
                    info: {
                        detailCode: exception_1.PresentationErrorDetailCode.UNAUTHORIZED,
                    },
                }),
            ];
        const jwtToken = authToken.split(' ')[1];
        return (0, encrypt_1.verifyJWT)(jwtToken);
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth-middleware.js.map