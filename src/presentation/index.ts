/* eslint-disable @typescript-eslint/no-unused-vars */

import DatabaseModule from '@infrastructure/rdb/config/connection';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InternalApiModule } from '@presentation/internal';

@Module({
  imports: [
    InternalApiModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
  ],
})
export class ApiModule {}
