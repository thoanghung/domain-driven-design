import BaseView from '@view/base';
import IPostViewRepository from '@view/view-repository/post-view-repository';
export default class PostDetailView extends BaseView {
    private readonly postViewRepository;
    constructor(postViewRepository: IPostViewRepository);
    getPostDetail(id: number): Promise<{
        data: import("../dto/post-detail-dto").PostDetailDto;
    }>;
}
