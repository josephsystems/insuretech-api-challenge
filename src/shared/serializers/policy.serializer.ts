import { Expose, Transform } from 'class-transformer';
import { SerializedProduct } from './product.serializer';

export class SerializedPolicy {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  benefactoryEmail: string;

  @Transform(({ obj }) => obj.plan.product)
  @Expose()
  product: SerializedProduct;
}
