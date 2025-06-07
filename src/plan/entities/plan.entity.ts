import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { PendingPolicy } from 'src/pending-policy/entities/pending-policy.entity';
import { BaseEntity } from '../../shared/entities/base.entity';

@Entity('plans')
export class Plan extends BaseEntity {
  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => User, (user) => user.plans)
  user: User;

  @OneToMany(() => PendingPolicy, (pendingPolicy) => pendingPolicy.plan, {
    cascade: true,
  })
  pendingPolicies: PendingPolicy[];
}
