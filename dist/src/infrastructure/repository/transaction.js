"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class TransactionManager {
    async transaction(callback) {
        return (0, typeorm_1.getManager)().transaction(callback);
    }
}
exports.default = TransactionManager;
//# sourceMappingURL=transaction.js.map