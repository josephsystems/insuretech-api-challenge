import { Expose, Transform } from 'class-transformer';
import { SerializedProduct } from './product.serializer';
import { SerializedUser } from './user.serializer';

export class SerializedPolicy {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  beneficiaryEmail: string;

  @Transform(({ obj }) => obj.product)
  @Expose()
  product: SerializedProduct;

  @Transform(({ obj }) => obj.user)
  @Expose()
  user: SerializedUser;
}
