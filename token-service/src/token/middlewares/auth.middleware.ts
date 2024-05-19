import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthenticatedRequest } from './auth.request';
import { SECRET_KEY } from '../constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authentication = req.headers['authorization']?.split(' ');
    if (!authentication || authentication[0] !== 'Bearer' || authentication.length !== 2) {
      throw new UnauthorizedException('Token is missing');
    }

    const token = authentication[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      req.userData = verify(token, SECRET_KEY);

      next();
    } catch (err) {
      console.error(err)
      throw new UnauthorizedException('Token is invalid');
    }
  }
}
