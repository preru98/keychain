import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';
import { IsUUID } from 'class-validator';

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('uuid')
  publicToken: string;

  @Generated('uuid')
  privateToken: string;

  @IsUUID()
  @Column()
  owner: string;
}
