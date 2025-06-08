import { IsEmail, IsNotEmpty } from 'class-validator';

export class ActivatePendingPolicyDto {
  @IsEmail()
  @IsNotEmpty()
  beneficiaryEmail: string;
}
