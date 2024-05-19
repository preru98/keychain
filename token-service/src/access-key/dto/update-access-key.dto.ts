import { IsDate, IsNumber, IsUUID } from 'class-validator';

export class UpdateAccessKeyDTO {
    @IsUUID()
    readonly accessKeyID: string;

    @IsUUID()
    readonly requesterId: string;

    @IsDate()
    readonly expiresAt: Date;

    @IsNumber()
    readonly requestRateLimit: number;
}