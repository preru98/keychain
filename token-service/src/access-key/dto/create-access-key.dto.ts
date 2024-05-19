import { Optional } from '@nestjs/common';
import { IsBoolean, IsDate, IsNumber, IsUUID } from 'class-validator';

export class CreateAccessKeyDTO {
    @IsNumber()
    @Optional()
    readonly requestRateLimit: number;

    @IsUUID()
    readonly owner: string;

    @IsUUID()
    readonly id: string;

    @IsDate()
    readonly expiresAt: Date;

    @IsBoolean()
    readonly disabled: boolean;
}