import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessKey } from '../entities/access-key.entity';



@Injectable()
export class AccessKeyService {
    constructor(
        @InjectRepository(AccessKey) private  accessKeyRepository: Repository<AccessKey>,
       
    ) {}
}