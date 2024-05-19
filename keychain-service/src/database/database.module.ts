// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../../typeorm.config'; 
import { Account } from '../account/entities/account.entity';
import { AccessKey } from '../access-key/entities/access-key.entity';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([Account]),  TypeOrmModule.forFeature([AccessKey])],
})
export class DatabaseModule {}
