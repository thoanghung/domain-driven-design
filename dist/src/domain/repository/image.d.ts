import { BaseRepository } from './base';
export declare enum DomainImageType {
    USER_AVATAR = "USER_AVATAR",
    POST_IMAGE = "POST_IMAGE"
}
export type ImageInfoPayload = {
    name: string;
    type: string;
    data: File;
    userId: number;
    postId?: number;
};
export declare abstract class IImageRepository extends BaseRepository {
    uploadImageToImageServer: (key: string, payload: ImageInfoPayload) => Promise<void>;
    generateKey: (domainImageType: DomainImageType, payload: ImageInfoPayload) => string;
    generateGetURL: (key: string) => string;
}
