import { Controller } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { AccessKeyService } from '../services/access-key.service';
import { CreateAccessKeyDTO } from '../dto/create-access-key.dto';
import { DisableAccessKeyDTO } from '../dto/disable-access-key.dto';
import { EnableAccessKeyDTO } from '../dto/enable-access-key.dto';
import { UpdateAccessKeyDTO  } from '../dto/update-access-key.dto';

@Controller('access-key')
export class AccessKeyController {
    constructor(private readonly redisService: RedisService, private readonly accessKeyService: AccessKeyService) {}

  async onModuleInit() {
    this.redisService.subscribe('access-key-created', (message) => {
        const createAccessKeyDTO: CreateAccessKeyDTO = JSON.parse(message);
        
        this.accessKeyService.createAccessKey(createAccessKeyDTO);
    });

    this.redisService.subscribe('access-key-updated', (message) => {
        const updateAccessKeyDTO: UpdateAccessKeyDTO = JSON.parse(message);
        console.log("UPDATED ACCESS KEY Parsed as DTO", updateAccessKeyDTO);
        this.accessKeyService.updateAccessKey(updateAccessKeyDTO);
    });

    this.redisService.subscribe('access-key-disabled', (message) => {
        const disableAccessKeyDTO: DisableAccessKeyDTO = JSON.parse(message);

        this.accessKeyService.disableAccessKey(disableAccessKeyDTO);
    });

    this.redisService.subscribe('access-key-enabled', (message) => {
        const enableAccessKeyDTO: EnableAccessKeyDTO = JSON.parse(message);

        this.accessKeyService.enableAccessKey(enableAccessKeyDTO);
    });
  }
}

