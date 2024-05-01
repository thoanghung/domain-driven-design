import { IImageRepository, DomainImageType, ImageInfoPayload } from '@domain/repository/image';
export default class ImageRepository implements IImageRepository {
    generateKey(domainImageType: DomainImageType, payload: ImageInfoPayload): string;
    generateGetURL(key: string): string;
    uploadImageToImageServer(key: string, payload: ImageInfoPayload): Promise<void>;
}
