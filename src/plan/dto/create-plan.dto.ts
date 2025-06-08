import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
