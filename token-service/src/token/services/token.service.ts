import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../entities/token.entity';
import { RedisService } from 'src/redis/redis.service';
import { AccessKey } from 'src/access-key/entities/access-key.entity';
import { getRateLimitKey } from '../token.utils';



@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token) private  tokenRepository: Repository<Token>,
        @InjectRepository(AccessKey) private  accessKeyRepository: Repository<AccessKey>,
        private readonly redisService: RedisService,
    ) {}

    async fetchToken(userId: string, accessKeyId: string): Promise<Token[]>{
        if (!userId || !accessKeyId) {
            throw new BadRequestException('Invalid request');
        }
        const accessKey = await this.accessKeyRepository.findOne({where: { globalAccessId: accessKeyId }});
        
        if (!accessKey) {
            throw new NotFoundException('Access key not found');
        }

        if (userId != accessKey.owner){
            throw new BadRequestException('Invalid access key');
        }

        if (accessKey.disabled) {
            throw new BadRequestException('Access key disabled');
        }

        if (accessKey.expiresAt < new Date()) {
            throw new BadRequestException('Access key expired');
        }

        const redisKey = getRateLimitKey(accessKeyId);

        const count = await this.redisService.incr(redisKey)
        this.redisService.expire(redisKey, 60);

        if (count > accessKey.requestRateLimit) {
            throw new BadRequestException('Rate limit exceeded');
        }

        const tokens = await this.tokenRepository.find({where: { owner: userId }}); // Change this as well once auth module returns user
        if (!tokens.length) {
            throw new NotFoundException('Token(s) not found');
        }
        return tokens;
    }
}