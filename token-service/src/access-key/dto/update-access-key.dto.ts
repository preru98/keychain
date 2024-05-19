import { Optional } from '@nestjs/common';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class UpdateAccessKeyDTO {
    @IsNumber()
    @Optional()
    readonly requestRateLimit: number;

    @IsUUID()
    @Optional()
    readonly owner: string;

    @IsUUID()
    @Optional()
    readonly id: string;

    @IsDate()
    @Optional()
    readonly expiresAt: Date;

}