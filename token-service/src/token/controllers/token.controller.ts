import { Controller, Header, Get, Post, Body, Param, Patch, Req } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { AuthenticatedRequest } from '../middlewares/auth.request';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}
    
    @Get('fetch-token/:accessKeyId')
    @Header('Content-Type', 'application/json')
    fetchToken(@Req() req: AuthenticatedRequest, @Param('accessKeyId') accessKeyId: string): object {
        return this.tokenService.fetchToken(req.userData.userId, accessKeyId);
    }
}

