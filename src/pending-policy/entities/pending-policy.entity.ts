import { Plan } from 'src/plan/entities/plan.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PendingPolicyStatus } from '../enums';
import { BaseEntity } from '../../shared/entities/base.entity';

@Entity('pending_policies')
export class PendingPolicy extends BaseEntity {
  @ManyToOne(() => Plan, (plan) => plan.pendingPolicies)
  plan: Plan;

  @Column({
    type: 'enum',
    enum: PendingPolicyStatus,
    default: PendingPolicyStatus.UNUSED,
  })
  status: PendingPolicyStatus;
}
