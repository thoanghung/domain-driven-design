"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IImageRepository = exports.DomainImageType = void 0;
const base_1 = require("./base");
var DomainImageType;
(function (DomainImageType) {
    DomainImageType["USER_AVATAR"] = "USER_AVATAR";
    DomainImageType["POST_IMAGE"] = "POST_IMAGE";
})(DomainImageType = exports.DomainImageType || (exports.DomainImageType = {}));
class IImageRepository extends base_1.BaseRepository {
}
exports.IImageRepository = IImageRepository;
//# sourceMappingURL=image.js.map