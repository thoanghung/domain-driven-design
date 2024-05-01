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
exports.CreatePostUsecaseOutput = exports.CreatedPostDto = exports.CreatePostUsecaseInput = void 0;
const image_1 = require("@domain/repository/image");
const post_1 = require("@domain/repository/post");
const transaction_1 = require("@domain/repository/transaction");
const user_1 = require("@domain/repository/user");
const exception_1 = require("@infrastructure/exception");
const post_2 = require("@infrastructure/factory/post");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_result_1 = require("@usecase/dto/api-result");
const exception_2 = require("@usecase/exception");
const base_1 = require("../../base");
class CreatePostUsecaseInput extends base_1.UsecaseInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post content',
        required: false,
        type: String,
    }),
    __metadata("design:type", String)
], CreatePostUsecaseInput.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post tags list',
        required: false,
        type: [String],
    }),
    __metadata("design:type", Array)
], CreatePostUsecaseInput.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Images list',
        required: true,
        type: [String],
        format: 'binary',
    }),
    __metadata("design:type", Object)
], CreatePostUsecaseInput.prototype, "images", void 0);
exports.CreatePostUsecaseInput = CreatePostUsecaseInput;
class CreatedPostDto {
    constructor({ id, images, tags, content, createdAt, }) {
        this.id = id;
        this.images = images;
        this.tags = tags;
        this.content = content;
        this.createdAt = createdAt;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post id',
        required: true,
        type: Number,
    }),
    __metadata("design:type", Number)
], CreatedPostDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post image urls',
        required: true,
        type: [String],
    }),
    __metadata("design:type", Array)
], CreatedPostDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post tags list',
        required: true,
        type: [String],
    }),
    __metadata("design:type", Array)
], CreatedPostDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post content',
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], CreatedPostDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Post created date',
        required: true,
        type: Date,
    }),
    __metadata("design:type", Date)
], CreatedPostDto.prototype, "createdAt", void 0);
exports.CreatedPostDto = CreatedPostDto;
class CreatePostUsecaseOutput extends base_1.UsecaseOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'API result',
        type: api_result_1.default,
        required: true,
    }),
    __metadata("design:type", api_result_1.default)
], CreatePostUsecaseOutput.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Created Post DTO',
        type: CreatedPostDto,
        required: true,
    }),
    __metadata("design:type", CreatedPostDto)
], CreatePostUsecaseOutput.prototype, "post", void 0);
exports.CreatePostUsecaseOutput = CreatePostUsecaseOutput;
const postFactory = new post_2.PostFactory();
const MAX_NUMBER_PICS_OF_POST = 10;
let CreatePostUsecase = class CreatePostUsecase extends base_1.Usecase {
    constructor(userRepository, imageRepository, postRepository, transactionManager) {
        super();
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.postRepository = postRepository;
        this.transactionManager = transactionManager;
    }
    async execute(input, userId) {
        const userEntity = await this.userRepository.getById(null, userId);
        if (!userEntity) {
            throw new exception_2.UsecaseError({
                code: exception_2.UsecaseErrorCode.NOT_FOUND,
                message: 'User does not exist',
                info: {
                    detailCode: exception_2.UsecaseErrorDetailCode.USER_NOT_EXIST,
                    userId,
                },
            });
        }
        if (!input.images || input.images.length === 0) {
            throw new exception_2.UsecaseError({
                code: exception_2.UsecaseErrorCode.BAD_REQUEST,
                message: 'Post must have at least one image',
                info: {
                    detailCode: exception_2.UsecaseErrorDetailCode.POST_MUST_HAVE_IMAGE,
                },
            });
        }
        if (input.images.length > MAX_NUMBER_PICS_OF_POST) {
            throw new exception_2.UsecaseError({
                code: exception_2.UsecaseErrorCode.BAD_REQUEST,
                message: 'Post can have maximum 10 pictures',
                info: {
                    detailCode: exception_2.UsecaseErrorDetailCode.NUMBER_OF_PICS_LIMITED,
                },
            });
        }
        const newPostEntity = postFactory.createNewPostEntity(input.content, [], input.tags, userId);
        let createdPostEntity;
        try {
            await this.transactionManager.transaction(async (transaction) => {
                createdPostEntity = await this.postRepository.save(transaction, newPostEntity);
                const imagesInfo = {};
                const imageGetUrls = [];
                input.images.forEach((image) => {
                    const imageInfoPayload = {
                        name: image.originalname,
                        type: image.mimetype,
                        data: image.buffer,
                        userId,
                        postId: createdPostEntity.id,
                    };
                    const imageKey = this.imageRepository.generateKey(image_1.DomainImageType.POST_IMAGE, imageInfoPayload);
                    imageGetUrls.push(this.imageRepository.generateGetURL(imageKey));
                    imagesInfo[imageKey] = imageInfoPayload;
                });
                const uploadImagePromises = Object.keys(imagesInfo).map((imageKey) => this.imageRepository.uploadImageToImageServer(imageKey, imagesInfo[imageKey]));
                await Promise.all(uploadImagePromises);
                createdPostEntity.updateImages(imageGetUrls);
                await this.postRepository.update(transaction, createdPostEntity);
            });
        }
        catch (error) {
            if (error instanceof exception_1.InfrastructureError) {
                throw error;
            }
            else {
                throw new exception_2.UsecaseError({
                    code: exception_2.UsecaseErrorCode.INTERNAL_SERVER_ERROR,
                    message: 'Internal Server Error',
                });
            }
        }
        const output = new CreatePostUsecaseOutput();
        output.result = api_result_1.default.ok();
        let postDto;
        if (createdPostEntity) {
            postDto = new CreatedPostDto({
                id: createdPostEntity.id,
                images: createdPostEntity.images,
                tags: createdPostEntity.tags,
                content: createdPostEntity.content,
                createdAt: createdPostEntity.createdAt,
            });
        }
        output.post = postDto;
        return output;
    }
};
CreatePostUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_1.IUserRepository)),
    __param(1, (0, common_1.Inject)(image_1.IImageRepository)),
    __param(2, (0, common_1.Inject)(post_1.IPostRepository)),
    __param(3, (0, common_1.Inject)(transaction_1.default)),
    __metadata("design:paramtypes", [user_1.IUserRepository,
        image_1.IImageRepository,
        post_1.IPostRepository,
        transaction_1.default])
], CreatePostUsecase);
exports.default = CreatePostUsecase;
//# sourceMappingURL=index.js.map