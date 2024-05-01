import { PostDetailDto } from '@view/dto/post-detail-dto';
import IPostViewRepository from '@view/view-repository/post-view-repository';
import { UserPostDto } from '@view/dto/user-post-dto';
export default class PostViewRepository implements IPostViewRepository {
    getPostDetail(id: number): Promise<PostDetailDto | null>;
    getUserPosts(userId: number): Promise<UserPostDto[]>;
    private getBaseQueryForPostDetail;
    private getBaseQueryForUserPost;
}
