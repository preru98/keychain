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
        // If accountId is not a valid UUID, throw an error
        if (!accountId.match(/^[0-9a-fA-F]{24}$/)) {
            throw new BadRequestException('Account ID is not a valid UUID.');
        }
        const jwtToken = jwt.sign({ accountId }, SECRET_KEY);

        return {jwtToken};      
    }
}