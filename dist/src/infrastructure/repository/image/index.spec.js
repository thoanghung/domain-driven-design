"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_1 = require("@config/aws");
const image_1 = require("@domain/repository/image");
const exception_1 = require("@infrastructure/exception");
const _1 = require(".");
describe('Image Repository Testing', () => {
    const imageRepository = new _1.default();
    let result;
    let splitResult = [];
    let key;
    describe('generateKey Testing', () => {
        const userId = 1;
        const postId = 2;
        describe('Generate avatar key', () => {
            beforeAll(() => {
                result = imageRepository.generateKey(image_1.DomainImageType.USER_AVATAR, {
                    name: 'test_image',
                    type: 'img/jpeg',
                    data: null,
                    userId,
                });
                splitResult = result.split('/');
            });
            it('Key has "users" in its value', () => {
                expect(splitResult[0]).toEqual('users');
            });
            it('Key has "avatars" in its value', () => {
                expect(splitResult[2]).toEqual('avatars');
            });
            it('Key has 4 segments', () => {
                expect(splitResult.length).toEqual(4);
            });
            it('Key contains userId', () => {
                expect(splitResult[1]).toEqual(userId.toString());
            });
        });
        describe('Generate post image key', () => {
            beforeAll(() => {
                result = imageRepository.generateKey(image_1.DomainImageType.POST_IMAGE, {
                    name: 'test_image',
                    type: 'img/jpeg',
                    data: null,
                    userId,
                    postId,
                });
                splitResult = result.split('/');
            });
            it('Key has "users" in its value', () => {
                expect(splitResult[0]).toEqual('users');
            });
            it('Key has "posts" in its value', () => {
                expect(splitResult[2]).toEqual('posts');
            });
            it('Key has 5 segments', () => {
                expect(splitResult.length).toEqual(5);
            });
            it('Key contains userId', () => {
                expect(splitResult[1]).toEqual(userId.toString());
            });
            it('Key contains postId', () => {
                expect(splitResult[3]).toEqual(postId.toString());
            });
        });
    });
    describe('generateGetURL Testing', () => {
        describe('Pass a not empty image key', () => {
            beforeAll(() => {
                key = 'test-key';
                result = imageRepository.generateGetURL(key);
            });
            it('Returned Get URL contains image server URL', () => {
                expect(result.includes(aws_1.testImageServerURL)).toEqual(true);
            });
            it('Returned Get URL contains image key', () => {
                expect(result.includes(key)).toEqual(true);
            });
        });
        describe('Pass an empty image key', () => {
            let error;
            beforeAll(() => {
                key = '';
                try {
                    result = imageRepository.generateGetURL(key);
                }
                catch (err) {
                    error = err;
                }
            });
            it('Error code is BAD_REQUEST', () => {
                expect(error.code).toEqual(exception_1.InfrastructureErrorCode.BAD_REQUEST);
            });
            it('Error message is "Image key can not be empty"', () => {
                expect(error.message).toEqual('Image key can not be empty');
            });
            it('Error detail code is IMAGE_KEY_CAN_NOT_BE_EMPTY', () => {
                expect(error.info.detailCode).toEqual(exception_1.InfrastructureErrorDetailCode.IMAGE_KEY_CAN_NOT_BE_EMPTY);
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map