import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ProductCategory } from '../enum';

export class FilterProductDto {
  @IsOptional()
  @IsEnum(ProductCategory)
  category?: ProductCategory;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => (value >= 0 ? value : undefined))
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => (value >= 0 ? value : undefined))
  maxPrice?: number;
}
