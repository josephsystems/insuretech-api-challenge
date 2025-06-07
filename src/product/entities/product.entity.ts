import { Column, Entity, OneToMany } from 'typeorm';
import { Currency, ProductCategory } from '../enum';
import { BaseEntity } from '../../shared/entities/base.entity';
import { Plan } from 'src/plan/entities/plan.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'enum', enum: ProductCategory })
  category: ProductCategory;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: Currency, default: Currency.NGN })
  currency: Currency;

  @OneToMany(() => Plan, (plan) => plan.product, { cascade: ['remove'] })
  plans: Plan[];
}
