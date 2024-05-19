import { Optional } from '@nestjs/common';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateAccessKeyDTO {
    @IsNumber()
    @Optional()
    readonly requestRateLimit: number;

    @IsUUID()
    readonly owner: string;

    @IsUUID()
    readonly accessKeyId: string;
}