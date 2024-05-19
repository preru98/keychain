import { IsUUID } from 'class-validator';

export class EnableAccessKeyDTO {
    @IsUUID()
    readonly requestedBy: string;
}