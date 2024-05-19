import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';
import { IsUUID } from 'class-validator';

// Per minute
const DEFAULT_REQUEST_RATE_LIMIT = 10;

@Entity()
export class AccessKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('uuid')
  key: string;

  @Column({ default: DEFAULT_REQUEST_RATE_LIMIT})
  requestRateLimit: number;

  @Column()
  expiresAt: Date;

  @Column({default: false})
  disabled: boolean;

  @IsUUID()
  @Column()
  createdBy: string ;  //UUID  User who created the key (admin)

  @IsUUID()
  @Column()
  owner: string;      //UUID User who owns the key (user)
}
