import { Test, TestingModule } from '@nestjs/testing';
import { AccessKeyService } from './access-key.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessKey } from '../entities/access-key.entity';
import { Repository } from 'typeorm';
import { Account, AccountRole } from 'src/account/entities/account.entity';
import { CreateAccessKeyDTO } from '../dto/create-access-key.dto';
import { UpdateAccessKeyDTO } from '../dto/update-access-key.dto';
import { DisableAccessKeyDTO } from '../dto/disable-access-key.dto';

describe('AccessKeyService', () => {
  let service: AccessKeyService;
  let accessKeyRepository: Repository<AccessKey>;
  let userRepository: Repository<Account>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessKeyService,
        {
          provide: getRepositoryToken(AccessKey),
          useClass: Repository
        },
        {
          provide: getRepositoryToken(Account),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<AccessKeyService>(AccessKeyService);
    accessKeyRepository = module.get<Repository<AccessKey>>(getRepositoryToken(AccessKey));
    userRepository = module.get<Repository<Account>>(getRepositoryToken(Account));
  });
});