import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
