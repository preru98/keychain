import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Generated } from 'typeorm';
import { Account } from '../../account/entities/account.entity';

// Per minute
const DEFAULT_REQUEST_RATE_LIMIT = 10;

@Entity()
export class AccessKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: DEFAULT_REQUEST_RATE_LIMIT})
  requestRateLimit: number;

  @Column()
  expiresAt: Date;

  @Column({default: false})
  disabled: boolean;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'createdBy' })
  createdBy: Account;  // User who created the key (admin)

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'owner' })
  owner: Account;      // User who owns the key (user)
}
