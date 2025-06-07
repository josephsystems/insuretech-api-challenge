import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class PlanDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  id: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  productId?: number;
}
