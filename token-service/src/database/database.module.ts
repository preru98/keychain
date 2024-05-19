// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../../typeorm.config'; 
import { Token } from '../token/entities/token.entity';
import { AccessKey } from '../access-key/entities/access-key.entity';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([Token]),  TypeOrmModule.forFeature([AccessKey])],
})
export class DatabaseModule {}
