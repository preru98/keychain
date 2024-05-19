import { Injectable } from '@nestjs/common';
import { SECRET_KEY } from '../constants';
const jwt = require('jsonwebtoken');
const { BadRequestException } = require('@nestjs/common');


@Injectable()
export class LoginService {
    constructor() {}

    async login(accountId: string): Promise<object>{
        if (!accountId) {
            throw new BadRequestException('Account ID is required for login.');
        }
        
        const jwtToken = jwt.sign({ accountId }, SECRET_KEY);

        return {jwtToken};      
    }
}