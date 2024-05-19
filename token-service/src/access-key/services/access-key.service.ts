import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessKey } from '../entities/access-key.entity';
import { CreateAccessKeyDTO } from '../dto/create-access-key.dto';
import { DisableAccessKeyDTO } from '../dto/disable-access-key.dto';
import { EnableAccessKeyDTO } from '../dto/enable-access-key.dto';



@Injectable()
export class AccessKeyService {
    constructor(
        @InjectRepository(AccessKey) private  accessKeyRepository: Repository<AccessKey>,
       
    ) { }

    // Create access key
    async createAccessKey(createAccessKeyDto: CreateAccessKeyDTO): Promise<AccessKey>{
        const accessKey = new AccessKey();
        accessKey.owner = createAccessKeyDto.owner;
        accessKey.requestRateLimit = createAccessKeyDto.requestRateLimit;

        return this.accessKeyRepository.save(accessKey);
    }

    // async updateAccessKey(accessKeyID: string, updateAccessKeyDto: UpdateAccessKeyDTO): Promise<AccessKey>{
    //     const user = await this.userRepository.findOne({where: { id: updateAccessKeyDto.requesterId}});
    //     if (!user) {
    //         throw new NotFoundException('Account not found');
    //     }

    //     if (user.role !== AccountRole.ADMIN) {
    //         throw new BadRequestException('Account is not an admin');
    //     }

    //     const accessKey = await this.accessKeyRepository.findOne({where: { id: accessKeyID}});
    //     if (!accessKey) {
    //         throw new NotFoundException('Access key not found');
    //     } 
        
    //     accessKey.expiresAt = updateAccessKeyDto.expiresAt;
    //     accessKey.requestRateLimit = updateAccessKeyDto.requestRateLimit;

    //     await this.redisService.publish('access-key-updated', JSON.stringify({accessKey}));

    //     return this.accessKeyRepository.save(accessKey);
    // }

    async disableAccessKey(disableAccessKeyDTO: DisableAccessKeyDTO){
        const accessKey = await this.accessKeyRepository.findOne({
                where: 
                    { 
                        id: disableAccessKeyDTO.accessKeyID
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
                        id: enableAccessKeyDTO.accessKeyID
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