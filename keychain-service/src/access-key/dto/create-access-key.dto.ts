import { Optional } from '@nestjs/common';
import { IsNumber, IsUUID, IsDate } from 'class-validator';

export class CreateAccessKeyDTO {
    @IsNumber()
    @Optional()
    readonly requestRateLimit: number;

    @IsUUID()
    readonly owner: string;

    @IsDate()
    @Optional()
    readonly expiresAt: Date;

    @IsUUID()
    readonly requester: string;
}