"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageFilter = void 0;
const exception_1 = require("@presentation/exception");
const uploadImageFilter = (req, file, callback) => {
    if (!file) {
        callback(null, true);
    }
    else if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new exception_1.PresentationError({
            code: exception_1.PresentationErrorCode.BAD_REQUEST,
            message: 'Invalid file type (image: jpg, jpeg, png, gif) only',
            info: {
                detailCode: exception_1.PresentationErrorDetailCode.INVALID_FILE_TYPE,
            },
        }), false);
    }
    callback(null, true);
};
exports.uploadImageFilter = uploadImageFilter;
//# sourceMappingURL=file.js.map