import { PendingPolicy } from './pending-policy.entity';
import { Plan } from '../../plan/entities/plan.entity';
import { PendingPolicyStatus } from '../enums';

describe('PendingPolicy Entity', () => {
  let pendingPolicy: PendingPolicy;
  let plan: Plan;

  beforeEach(() => {
    plan = new Plan();
    plan.id = 1;

    pendingPolicy = new PendingPolicy();
    pendingPolicy.id = 1;
    pendingPolicy.plan = plan;
    pendingPolicy.status = PendingPolicyStatus.UNUSED;
    pendingPolicy.createdAt = new Date();
    pendingPolicy.updatedAt = new Date();
  });

  it('should create a valid pending policy entity', () => {
    expect(pendingPolicy).toBeDefined();
    expect(pendingPolicy.id).toBe(1);
    expect(pendingPolicy.plan).toBe(plan);
    expect(pendingPolicy.status).toBe(PendingPolicyStatus.UNUSED);
    expect(pendingPolicy.createdAt).toBeInstanceOf(Date);
    expect(pendingPolicy.updatedAt).toBeInstanceOf(Date);
  });

  it('should have a many-to-one relationship with plan', () => {
    expect(pendingPolicy.plan).toBe(plan);
    expect(pendingPolicy.plan.id).toBe(1);
  });

  it('should have a valid status', () => {
    pendingPolicy.status = PendingPolicyStatus.UNUSED;
    expect(pendingPolicy.status).toBe(PendingPolicyStatus.UNUSED);

    pendingPolicy.status = PendingPolicyStatus.USED;
    expect(pendingPolicy.status).toBe(PendingPolicyStatus.USED);
  });

  it('should have default status as UNUSED', () => {
    const newPendingPolicy = new PendingPolicy();
    expect(newPendingPolicy.status).toBe(PendingPolicyStatus.UNUSED);
  });
});
