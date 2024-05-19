import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKeyService } from './services/access-key.service';
import { AccessKey } from './entities/access-key.entity';
import { AccessKeyController } from './controllers/access-key.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey])],
  providers: [AccessKeyService],
  controllers: [AccessKeyController],
  exports: [],
})

export class AccessKeyModule {}