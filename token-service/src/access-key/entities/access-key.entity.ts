import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';
import { IsUUID } from 'class-validator';

// Per minute
const DEFAULT_REQUEST_RATE_LIMIT = 10;

@Entity()
export class AccessKey {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsUUID()
  @Column()
  globalAccessId: string;     // PK of access key from keychain-service


  @Column({ default: DEFAULT_REQUEST_RATE_LIMIT})
  requestRateLimit: number;

  @Column()
  expiresAt: Date;

  @Column({default: false})
  disabled: boolean;

  @IsUUID()
  @Column()
  owner: string;      //UUID User who owns the key (user)
}
