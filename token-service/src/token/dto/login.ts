import { IsUUID } from 'class-validator';

export class LoginDTO {
    @IsUUID()
    readonly accountId: string;
}