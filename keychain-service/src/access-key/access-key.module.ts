import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKeyService } from './services/access-key.service';
import { AccessKeyController } from './controllers/access-key.controller';
import { AccessKey } from './entities/access-key.entity';
import { Account } from 'src/account/entities/account.entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey]), TypeOrmModule.forFeature([Account]), RedisModule],
  providers: [AccessKeyService],
  controllers: [AccessKeyController],
  exports: [],
})

export class AccessKeyModule {}