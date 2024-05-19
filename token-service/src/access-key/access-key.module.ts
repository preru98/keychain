import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKeyService } from './services/access-key.service';
import { AccessKey } from './entities/access-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey])],
  providers: [AccessKeyService],
  controllers: [],
  exports: [],
})

export class AccessKeyModule {}