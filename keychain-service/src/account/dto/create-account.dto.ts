import { IsString, IsEmail, IsEnum } from 'class-validator';
import { AccountRole } from '../entities/account.entity';

export class createAccountDTO {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(AccountRole)
  readonly role: AccountRole;
}