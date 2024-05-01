"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = require("@domain/repository/image");
const exception_1 = require("@infrastructure/exception");
const aws_1 = require("@utils/aws");
const encrypt_1 = require("@utils/encrypt");
class ImageRepository {
    generateKey(domainImageType, payload) {
        const currentTimeStamp = new Date().getTime();
        const hashName = `${(0, encrypt_1.hashString)(payload.name + currentTimeStamp)}.${payload.type.split('/')[1]}`;
        let key = '';
        switch (domainImageType) {
            case image_1.DomainImageType.USER_AVATAR:
                key = `users/${payload.userId}/avatars/${hashName}`;
                break;
            case image_1.DomainImageType.POST_IMAGE:
            default:
                key = `users/${payload.userId}/posts/${payload.postId}/${hashName}`;
                break;
        }
        return key;
    }
    generateGetURL(key) {
        if (key.length === 0) {
            throw new exception_1.InfrastructureError({
                code: exception_1.InfrastructureErrorCode.BAD_REQUEST,
                message: 'Image key can not be empty',
                info: {
                    detailCode: exception_1.InfrastructureErrorDetailCode.IMAGE_KEY_CAN_NOT_BE_EMPTY,
                },
            });
        }
        return (0, aws_1.generateS3GetURL)(key);
    }
    async uploadImageToImageServer(key, payload) {
        try {
            await (0, aws_1.uploadImageToS3Bucket)(key, payload.data);
        }
        catch (err) {
            throw new exception_1.InfrastructureError({
                code: exception_1.InfrastructureErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Upload image to image server failed',
                info: {
                    errorCode: exception_1.InfrastructureErrorDetailCode.UPLOAD_IMAGE_TO_IMAGE_SERVER_FAILED,
                    errorContent: JSON.stringify(err.stack),
                    image: {
                        name: payload.name,
                        type: payload.type,
                        userId: payload.userId,
                        postId: payload.postId,
                    },
                },
            });
        }
    }
}
exports.default = ImageRepository;
//# sourceMappingURL=index.js.map