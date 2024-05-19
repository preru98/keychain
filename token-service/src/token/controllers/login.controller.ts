import { Controller, Header, Get, Post, Body, Param, Patch, Req } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { AuthenticatedRequest } from '../middlewares/auth.request';
import { LoginService } from '../services/login.service';
import { LoginDTO } from '../dto/login';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}
    
    @Post()
    @Header('Content-Type', 'application/json')
    async login(@Body() loginDto: LoginDTO): Promise<object> {
        return this.loginService.login(loginDto.accountId);
    }
}

