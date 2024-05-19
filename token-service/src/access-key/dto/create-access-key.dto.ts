import { Optional } from '@nestjs/common';
import { IsNumber, IsUUID } from 'class-validator';

export class CreateAccessKeyDTO {
    @IsNumber()
    @Optional()
    readonly requestRateLimit: number;

    @IsUUID()
    readonly owner: string;

    // Might have to add expiry here as well, default will be 30 days
}