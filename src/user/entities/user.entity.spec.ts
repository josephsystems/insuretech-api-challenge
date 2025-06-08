import { User } from './user.entity';
import { Plan } from '../../plan/entities/plan.entity';
import { Policy } from '../../policy/entities/policy.entity';

describe('User Entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.id = 1;
    user.email = 'test@example.com';
    user.firstName = 'Test';
    user.lastName = 'User';
    user.wallet = 10000; // 100 Naira in Kobo
    user.plans = [];
    user.policies = [];
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });

  it('should create a valid user entity', () => {
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
    expect(user.email).toBe('test@example.com');
    expect(user.firstName).toBe('Test');
    expect(user.lastName).toBe('User');
    expect(user.wallet).toBe(10000);
    expect(user.plans).toEqual([]);
    expect(user.policies).toEqual([]);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should have a one-to-many relationship with plans', () => {
    const plan = new Plan();
    plan.id = 1;

    user.plans = [plan];

    expect(user.plans).toHaveLength(1);
    expect(user.plans[0]).toBeInstanceOf(Plan);
    expect(user.plans[0].id).toBe(1);
  });

  it('should have a one-to-many relationship with policies', () => {
    const policy = new Policy();
    policy.id = 1;

    user.policies = [policy];

    expect(user.policies).toHaveLength(1);
    expect(user.policies[0]).toBeInstanceOf(Policy);
    expect(user.policies[0].id).toBe(1);
  });
});
