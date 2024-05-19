import { Injectable } from '@nestjs/common';
import { CustomRepositoryCannotInheritRepositoryError, In } from 'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account, AccountRole } from '../entities/account.entity';
import { createAccountDTO } from '../dto/create-account.dto';

@Injectable()
export class AccountService {
    constructor(@InjectRepository(Account) private  accountRepository: Repository<Account>) {}

    // Get all users
    async findAll(): Promise<Account[]>{
        return this.accountRepository.find();
    }

    // Create user
    async createUser(accountDto: createAccountDTO): Promise<Account>{
        const account = new Account();
        console.log("ACCOUNTDTO", accountDto);
        account.email = accountDto.email;
        account.name = accountDto.name;
        account.role = accountDto.role;
        console.log("ACCOUNT", account);

        return this.accountRepository.save(account);
    }

}