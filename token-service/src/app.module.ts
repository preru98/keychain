import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenModule } from './token/token.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { AccessKeyModule } from './access-key/access-key.module';


@Module({
  imports: [TokenModule, DatabaseModule, RedisModule, AccessKeyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

