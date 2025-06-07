import { Expose, Transform, Type } from 'class-transformer';
import { SerializedProduct } from './product.serializer';
import { toNaira } from '../utils/currency';
import { calculateTotalCost } from '../utils/calculation';
import { SerializedUser } from './user.serializer';
import { SerializedPendingPolicy } from './pending-policy.serializer';

export class SerializedPlan {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  quantity: number;

  @Transform(({ obj }) => {
    const totalPriceKobo = calculateTotalCost(obj.product.price, obj.quantity);
    return parseFloat(String(toNaira(totalPriceKobo))).toFixed(2);
  })
  @Expose()
  totalPrice: string;

  @Transform(({ obj }) => calculateTotalCost(obj.product.price, obj.quantity))
  @Expose()
  totalPriceKobo: number;

  @Type(() => SerializedProduct)
  @Expose()
  product: SerializedProduct;

  @Type(() => SerializedUser)
  @Expose()
  user: SerializedUser;

  @Type(() => SerializedPendingPolicy)
  @Expose()
  pendingPolicies: SerializedPendingPolicy[];
}
