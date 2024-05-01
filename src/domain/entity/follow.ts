import { Expose } from '@nestjs/class-transformer';
import { BaseEntity } from './base';

export default class FollowEntity extends BaseEntity {
  @Expose()
  id?: number;

  @Expose()
  sourceUserId: number;

  @Expose()
  destinationUserId: number;
}
