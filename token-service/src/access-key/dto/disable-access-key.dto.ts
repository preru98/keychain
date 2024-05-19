import { IsUUID } from 'class-validator';

export class DisableAccessKeyDTO {
    @IsUUID()
    readonly accessKeyID: string;
}