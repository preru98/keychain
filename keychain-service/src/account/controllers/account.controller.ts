import { Controller, Header, Get, Post, Body } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { Account } from '../entities/account.entity';
import { createAccountDTO } from '../dto/create-account.dto';

@Controller('account')
export class UserController {
    constructor(private readonly userService: AccountService) {}
    
    @Get()
    @Header('Content-Type', 'application/json')
    findAll(): object {
        return this.userService.findAll();
    }

    @Post()
    @Header('Content-Type', 'application/json')
    async createUser(@Body() createAccountDTO: createAccountDTO): Promise<Account> {
        return await this.userService.createUser(createAccountDTO);
    }   

}

