
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import Comment from './src/infrastructure/rdb/entity/comment';
import Follow from './src/infrastructure/rdb/entity/follow';
import Like from './src/infrastructure/rdb/entity/like';
import Notification from './src/infrastructure/rdb/entity/notification';
import Post from './src/infrastructure/rdb/entity/post';
import UserDetail from './src/infrastructure/rdb/entity/user-detail';
import User from './src/infrastructure/rdb/entity/user';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow('MYSQL_HOST'),
  port: configService.getOrThrow('MYSQL_PORT'),
  database: configService.getOrThrow('MYSQL_DATABASE'),
  username: configService.getOrThrow('MYSQL_USERNAME'),
  password: configService.getOrThrow('MYSQL_PASSWORD'),
  migrations: ['src/infrastructure/rdb/migration/**'],
  entities: [User, UserDetail, Comment, Follow, Like, Notification, Post],
});
