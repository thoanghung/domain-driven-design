"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = exports.randomlyGenerateSalt = exports.hashPassword = exports.hashString = exports.AuthenTokenParamsSchema = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const zod_1 = require("zod");
const md5 = require("md5");
const constants_1 = require("@infrastructure/constants");
exports.AuthenTokenParamsSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    email: zod_1.z.string(),
});
const hashString = (source) => {
    return md5(source);
};
exports.hashString = hashString;
const hashPassword = (barePassword, salt) => {
    return bcrypt.hashSync(barePassword, salt);
};
exports.hashPassword = hashPassword;
const randomlyGenerateSalt = () => {
    return bcrypt.genSaltSync(constants_1.SALT_ROUND);
};
exports.randomlyGenerateSalt = randomlyGenerateSalt;
const generateJWT = (userId, email) => {
    return jwt.sign({ userId, email }, constants_1.JWT_CONFIG.secrete, {
        expiresIn: constants_1.JWT_CONFIG.expireTime,
    });
};
exports.generateJWT = generateJWT;
const verifyJWT = (jwtToken) => {
    let decoded;
    try {
        decoded = jwt.verify(jwtToken, constants_1.JWT_CONFIG.secrete);
        return [true, decoded, null];
    }
    catch (error) {
        return [false, null, error];
    }
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=encrypt.js.map