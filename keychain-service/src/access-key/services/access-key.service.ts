import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessKey } from '../entities/access-key.entity';
import { CreateAccessKeyDTO } from '../dto/create-access-key.dto';
import { Account, AccountRole } from 'src/account/entities/account.entity';
import { UpdateAccessKeyDTO } from '../dto/update-access-key.dto';
import { DisableAccessKeyDTO } from '../dto/disable-access-key.dto';
import { EnableAccessKeyDTO } from '../dto/enable-access-key.dto';
import { RedisService } from 'src/redis/redis.service';
import e from 'express';


const ACCESS_KEY_EXPIRATION_DELTA = 60 * 60 * 24 * 30 * 1000; // 30 days in milliseconds


@Injectable()
export class AccessKeyService {
    constructor(
        @InjectRepository(AccessKey) private  accessKeyRepository: Repository<AccessKey>,
        @InjectRepository(Account) private  userRepository: Repository<Account>,
        private readonly redisService: RedisService,
    ) {}

    // Get all users
    async findAll(): Promise<AccessKey[]>{     
        return this.accessKeyRepository.find( {relations: ['owner']} );
    }

    // Create access key
    async generateKey(createAccessKeyDto: CreateAccessKeyDTO): Promise<AccessKey>{
        const account = await this.userRepository.findOne({
            where: { id: createAccessKeyDto.requester }
        });
        if (!account) {
            throw new NotFoundException("Requester not found")
        }
        if (account.role !== AccountRole.ADMIN) {
            throw new BadRequestException("Requester is not admin")
        }

        const accessKey = new AccessKey();
        accessKey.owner = await this.userRepository.findOne({where: { id: createAccessKeyDto.owner}});
        if (!accessKey.owner) {
            throw new NotFoundException('Owner account not found');
        }
        if (!createAccessKeyDto.expiresAt){
            accessKey.expiresAt = new Date(Date.now() + ACCESS_KEY_EXPIRATION_DELTA); // Default is 30 days
        }
        else{
            if (createAccessKeyDto.expiresAt < new Date()){
                throw new BadRequestException('Expiration date is in the past');
            }
            accessKey.expiresAt = createAccessKeyDto.expiresAt;
        }
        accessKey.requestRateLimit = createAccessKeyDto.requestRateLimit;

        const createdAccessKey = await this.accessKeyRepository.save(accessKey);
        console.log("CREATED ACCESS KEY", createdAccessKey);

        await this.redisService.publish('access-key-created', JSON.stringify(createdAccessKey));

        return createdAccessKey;
    }

    async updateAccessKey(accessKeyID: string, updateAccessKeyDto: UpdateAccessKeyDTO): Promise<AccessKey>{
        const user = await this.userRepository.findOne({where: { id: updateAccessKeyDto.requesterId}});
        if (!user) {
            throw new NotFoundException('Account not found');
        }

        if (user.role !== AccountRole.ADMIN) {
            throw new BadRequestException('Account is not an admin');
        }

        const accessKey = await this.accessKeyRepository.findOne({where: { id: accessKeyID}});
        if (!accessKey) {
            throw new NotFoundException('Access key not found');
        } 
        
        if (updateAccessKeyDto.expiresAt){
            accessKey.expiresAt = updateAccessKeyDto.expiresAt;
        }
        if (updateAccessKeyDto.requestRateLimit){
            accessKey.requestRateLimit = updateAccessKeyDto.requestRateLimit;
        }

        const updatedAccessKey = await this.accessKeyRepository.save(accessKey);

        await this.redisService.publish('access-key-updated', JSON.stringify(updatedAccessKey));

        return updatedAccessKey;
    }

    async disableAccessKey(accessKeyID: string, disableAccessKeyDTO: DisableAccessKeyDTO){
        
        if (!disableAccessKeyDTO) {
            throw new BadRequestException('Requester not found');
        }
        const accessKey = await this.accessKeyRepository.findOne({
                where: 
                    { 
                        id: accessKeyID
                    }, 
                relations: ['owner']
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
        const user = await this.userRepository.findOne({where: { id: disableAccessKeyDTO.requestedBy}});
        if (!user) {
            throw new NotFoundException('Account not found');
        }
        if (user.id !== accessKey.owner.id) {
            throw new BadRequestException('Account is not the owner of the access key');
        }

        accessKey.disabled = true;

        await this.redisService.publish('access-key-disabled', JSON.stringify({accessKeyId: accessKeyID }));

        return this.accessKeyRepository.save(accessKey);
    }

    async enableAccessKey(accessKeyID: string, enableAccessKeyDTO: EnableAccessKeyDTO){
        if (!enableAccessKeyDTO) {
            throw new BadRequestException('Requester not found');
        }
        const accessKey = await this.accessKeyRepository.findOne({
                where: 
                    { 
                        id: accessKeyID
                    }, 
                relations: ['owner']
            });
        if (!accessKey) {
            throw new NotFoundException('Access key not found');
        }
        if (accessKey.expiresAt < new Date()) {
            throw new BadRequestException('Access key already expired');
        }
        const user = await this.userRepository.findOne({where: { id: enableAccessKeyDTO.requestedBy}});
        if (!user) {
            throw new NotFoundException('Account not found');
        }
        if (user.id !== accessKey.owner.id) {
            throw new BadRequestException('Account is not the owner of the access key');
        }

        accessKey.disabled = false;
        await this.redisService.publish('access-key-enabled', JSON.stringify({accessKeyId: accessKeyID }));

        return this.accessKeyRepository.save(accessKey);
    }

    async  getAccessKeyById(accessKeyID: string): Promise<AccessKey>{
        const accessKey = await this.accessKeyRepository.findOne({where: { id: accessKeyID}, relations: ['owner']});
        if (!accessKey) {
            throw new Error('Access key not found');
        }
        return accessKey;
    }
}