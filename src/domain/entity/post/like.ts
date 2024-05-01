import { Expose } from '@nestjs/class-transformer';
import { BaseEntity } from '../base';

export default class LikeEntity extends BaseEntity {
  @Expose()
  id?: number;

  @Expose()
  userId: number;

  @Expose()
  postId: number;
}
