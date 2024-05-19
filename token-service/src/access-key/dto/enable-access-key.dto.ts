import { IsUUID } from 'class-validator';

export class EnableAccessKeyDTO {
    
    @IsUUID()
    readonly accessKeyID: string;
}