import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt, Min, Max, IsEmail, IsEnum, IsOptional } from 'class-validator';

export enum AccountRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ type: 'enum', enum: AccountRole, default: AccountRole.USER })
  @IsEnum(AccountRole)
  role: AccountRole;
}
