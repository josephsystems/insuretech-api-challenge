import { Product } from 'src/product/entities/product.entity';
import { BaseEntity } from '../../shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PendingPolicy } from 'src/pending-policy/entities/pending-policy.entity';

@Entity('policies')
export class Policy extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  beneficiaryEmail: string;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => User, (user) => user.policies)
  user: User;

  @OneToOne(() => PendingPolicy)
  @JoinColumn()
  pendingPolicy: PendingPolicy;
}
