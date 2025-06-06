import { IsDecimal, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProductCategory } from '../enum';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsNotEmpty()
  @IsEnum(ProductCategory)
  category: ProductCategory;
}
