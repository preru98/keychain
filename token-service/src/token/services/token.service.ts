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

    async fetchToken(userId: string, accessKeyId: string): Promise<Token>{
        const redisKey = getRateLimitKey(accessKeyId);

        // Update the access key rate limit
        const count = await this.redisService.incr(redisKey)
        this.redisService.expire(redisKey, 60);

        const accessKey = await this.accessKeyRepository.findOne({where: { id: accessKeyId }});

        if (count > accessKey.requestRateLimit) {
            throw new BadRequestException('Rate limit exceeded');
        }

        const token = await this.tokenRepository.findOne({where: { owner: userId }}); // Change this as well once auth module returns user
        if (!token) {
            throw new NotFoundException('Token not found');
        }
        return token;
    }
}