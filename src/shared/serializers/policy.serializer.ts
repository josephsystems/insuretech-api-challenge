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
  beneficiaryEmail: string;

  @Transform(({ obj }) => obj.product || (obj.plan && obj.plan.product))
  @Expose()
  product: SerializedProduct;
}
