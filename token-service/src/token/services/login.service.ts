import { Injectable } from '@nestjs/common';
import { SECRET_KEY } from '../constants';
const jwt = require('jsonwebtoken');


@Injectable()
export class LoginService {
    constructor() {}

    async login(accountId: string): Promise<object>{
        const jwtToken = jwt.sign({ accountId }, SECRET_KEY);

        return {jwtToken};      
    }
}