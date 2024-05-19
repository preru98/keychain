import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessKeyModule } from './access-key/access-key.module';
import { UserModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';


@Module({
  imports: [UserModule, AccessKeyModule, DatabaseModule, RedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

