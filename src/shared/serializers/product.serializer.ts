import { Expose, Transform } from 'class-transformer';
import { ProductCategory } from '../../product/enum';
import { toNaira } from '../utils/currency';

export class SerializedProduct {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Transform(({ obj }) => obj.price)
  @Expose()
  priceKobo: number;

  @Transform(({ obj }) => parseFloat(String(toNaira(obj.price))).toFixed(2))
  @Expose()
  price: string;

  @Expose()
  category: ProductCategory;
}
