import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessKey } from '../entities/access-key.entity';
import { CreateAccessKeyDTO } from '../dto/create-access-key.dto';
import { DisableAccessKeyDTO } from '../dto/disable-access-key.dto';
import { EnableAccessKeyDTO } from '../dto/enable-access-key.dto';
import { UpdateAccessKeyDTO } from '../dto/update-access-key.dto';



@Injectable()
export class AccessKeyService {
    constructor(
        @InjectRepository(AccessKey) private  accessKeyRepository: Repository<AccessKey>,
       
    ) { }

    // Create access key
    async createAccessKey(createAccessKeyDto: CreateAccessKeyDTO): Promise<AccessKey>{
        const accessKey = new AccessKey();
        accessKey.owner = createAccessKeyDto.owner["id"]; 
        accessKey.requestRateLimit = createAccessKeyDto.requestRateLimit;
        accessKey.expiresAt = createAccessKeyDto.expiresAt;
        accessKey.disabled = createAccessKeyDto.disabled;
        accessKey.globalAccessId = createAccessKeyDto.id;
        
        return this.accessKeyRepository.save(accessKey);
    }

    async updateAccessKey(updateAccessKeyDto: UpdateAccessKeyDTO): Promise<AccessKey>{
        const accessKey = await this.accessKeyRepository.findOne({where: { globalAccessId: updateAccessKeyDto.id}});
        if (!accessKey) {
            throw new NotFoundException('Access key not found');
        }
        if (updateAccessKeyDto.expiresAt)  
            accessKey.expiresAt = updateAccessKeyDto.expiresAt;
        if (updateAccessKeyDto.requestRateLimit)
            accessKey.requestRateLimit = updateAccessKeyDto.requestRateLimit;

        return this.accessKeyRepository.save(accessKey);
    }

    async disableAccessKey(disableAccessKeyDTO: DisableAccessKeyDTO){
        const accessKey = await this.accessKeyRepository.findOne({
                where: 
                    { 
                        globalAccessId: disableAccessKeyDTO.accessKeyID
                    }
            });
        if (!accessKey) {
            throw new NotFoundException('Access key not found');
        }

        if (accessKey.disabled) {
            throw new BadRequestException('Access key already disabled');
        }

        if (accessKey.expiresAt < new Date()) {
            throw new BadRequestException('Access key already expired');
        }
        
        accessKey.disabled = true;

        return this.accessKeyRepository.save(accessKey);
    }

    async enableAccessKey(enableAccessKeyDTO: EnableAccessKeyDTO){
        const accessKey = await this.accessKeyRepository.findOne({
                where: 
                    { 
                        globalAccessId: enableAccessKeyDTO.accessKeyID
                    }
            });
        if (!accessKey) {
            throw new NotFoundException('Access key not found');
        }
        if (accessKey.expiresAt < new Date()) {
            throw new BadRequestException('Access key already expired');
        }

        accessKey.disabled = false;

        return this.accessKeyRepository.save(accessKey);
    }
}